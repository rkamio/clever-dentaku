import firebase from "firebase"
import 'firebase/firestore'

// .env に設定した値を取得してる
const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}


export default  firebase ;
