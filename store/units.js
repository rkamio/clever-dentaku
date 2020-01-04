import db from '~/plugins/db.js'

export const state = () => ({
  units:[]
})

export const mutations = {
  setUnits: function(units) {
    state.units = units;
  }
}

export const actions = {
  async loadUnits({ commit }) {
    let docRef = await db.collection('units').get();
    // console.log(docRef);
  },
}