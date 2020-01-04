import firebase from '~/plugins/firebase.js'
import db from '~/plugins/db.js'


export const state = () => ({
  uid:null,
  email: null,
  name: null,
  photoURL: null,
  isAuthorized: false,
  favorites:[],
  privateUnits:[]
})

export const mutations = {
  storeUser (state, payload) {
    state.uid = payload.uid;
    state.email = payload.email;
    state.name = payload.name;
    state.photoURL = payload.photoURL;
    state.isAuthorized = payload.isAuthorized;
  },
  storeUserAppData (state,payload) {
    state.favorites = payload.favorites;
    state.privateUnits = payload.privateUnits;
  },
  clearUser (state) {
    state.uid = null;
    state.email = null;
    state.name = null;
    state.photoURL = null;
    state.isAuthorized = false;
    state.favorites = [],
    state.privateUnits = []
  },
  addFavorite (state, unitId) {
    state.favorites.push(unitId);
  },
  removeFavorite (state, unitId) {
    state.favorites = state.favorites.filter(idx => idx !== unitId);
  }
}

export const actions = {
  googleSignIn ({ dispatch }) {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    dispatch('googleAuthStateChanged');
  },
  googleSignOut ({ dispatch }) {
    firebase.auth().signOut();
    dispatch('googleAuthStateChanged');
  },
  googleAuthStateChanged ({ dispatch, commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let { uid,email,displayName,photoURL } = user;
        commit('storeUser', { 
          uid: uid, 
          email: email, 
          name: displayName, 
          photoURL: photoURL,
          isAuthorized: true
        });
        dispatch('userCheck');
      } else {
        commit('clearUser');
        console.log('Cleared Successfully.')
      }
    })
  },
  userCheck ({ dispatch, commit, state }) {
    db.collection('users').doc(state.uid).get().then((doc) => {
      if (doc.exists) {
        commit('storeUserAppData', { 
          favorites: doc.data().favorites,
          privateUnits: doc.data().privateUnits
         });
      } else {
        console.log("No such document!");
        dispatch('createUser');
      }
    }).catch((error) => {
      console.error("Error getting document:", error);
    })
  },
  createUser ({ state }) {
    db.collection('users').doc(state.uid).set({
      email: state.email,
      name: state.name,
      photoURL: state.photoURL,
      favorites: [],
      privateUnits: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      console.log("Document successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    })
  },
  async addFavorite ({ commit, state, dispatch },{ unitId }) {
    const userDocRef = db.collection('users').doc(state.uid);
    const unitDocRef = db.collection('units').doc(unitId);
    const increment = firebase.firestore.FieldValue.increment(1);
    let newFavorites = state.favorites.slice();
    newFavorites.push(unitId);

    /* 重複チェック */
    if (state.favorites.includes(unitId)) {
      return ;
    }

    /* unitsとusersの整合性をとる (Aがunitをdeleteしたが、Bがお気に入り登録している場合) */
    if (state.favorites.length >= process.env.USER_FAV_MAX) {
      for (let i=0;i<state.favorites.length;i++) {
        const doc = await db.collection('units').doc(state.favorites[i]).get();
        if (!doc.exists) {
          await dispatch('removeFavorite',{unitId: state.favorites[i]});
          continue;
        }
      }
    }

    /* お気に入り数上限チェック */
    if (state.favorites.length >= process.env.USER_FAV_MAX) {
      throw 'FavoriteCountExceedException';
    }

    /* トランザクションでusersとunitsを一緒に更新 */
    await db.runTransaction(async transaction => {
      transaction.update(userDocRef,{
        favorites: newFavorites
      });
      transaction.update(unitDocRef,{
        favoriteCount: increment,
      });
    })
    commit('addFavorite',unitId);
    console.log('addFavorite Done')
  },
  async cancelFavorite ({ commit, state },{ unitId }) {

    const userDocRef = db.collection('users').doc(state.uid);
    const unitDocRef = db.collection('units').doc(unitId);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    const newFavorites = state.favorites.filter(idx => idx !== unitId);

    /* 重複チェック */
    if (!state.favorites.includes(unitId)) {
      return ;
    }
    
    /* トランザクションでusersとunitsを一緒に更新 */
    await db.runTransaction(async transaction => {
      transaction.update(userDocRef,{
        favorites: newFavorites
      });
      transaction.update(unitDocRef,{
        favoriteCount: decrement
      });
    })
    commit('removeFavorite',unitId);
    console.log('cancelFavorite Done.')
  },
  async removeFavorite({ commit, state },{ unitId }) {
    const userDocRef = db.collection('users').doc(state.uid);
    const newFavorites = state.favorites.filter(idx => idx !== unitId);

    /* 重複チェック */
    if (state.favorites.indexOf(unitId) === -1) {
      return ;
    }

    await userDocRef.update({
      favorites: newFavorites
    })
    
    commit('removeFavorite',unitId);
    console.log('removeFavorite Done.')
  }
}