import firebase from '~/plugins/firebase.js'
import 'firebase/app'
import 'firebase/auth'

function auth() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      resolve(user || false)
    })
  })
}
export default auth