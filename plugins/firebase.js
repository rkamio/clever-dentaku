import firebase from "firebase/app"
import 'firebase/app'

// .env に設定した値を取得
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MESUREMENT_ID
}

// console.log(process.env.PROJECT_ID);

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}


export default  firebase ;
