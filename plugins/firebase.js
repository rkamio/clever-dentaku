import firebase from "firebase/app"
import 'firebase/app'

// .env に設定した値を取得
const config = {
  apiKey: process.env.NUXT_ENV_API_KEY,
  authDomain: process.env.NUXT_ENV_AUTH_DOMAIN,
  databaseURL: process.env.NUXT_ENV_DB_URL,
  projectId: process.env.NUXT_ENV_PROJECT_ID,
  storageBucket: process.env.NUXT_ENV_STORAGE_BUCKET,
  messagingSenderId: process.env.NUXT_ENV_MESSAGING_SENDER_ID,
  appId: process.env.NUXT_ENV_APP_ID,
  measurementId: process.env.NUXT_ENV_MESUREMENT_ID
}

console.log(process.env.NUXT_ENV_PROJECT_ID);

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}


export default  firebase ;
