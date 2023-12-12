// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// import { getFunctions } from 'firebase/functions'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCToXwV2dM_MRdh-cjrNsXK3dThNKgO5dM',
	authDomain: 'dropbox-26646.firebaseapp.com',
	projectId: 'dropbox-26646',
	storageBucket: 'dropbox-26646.appspot.com',
	messagingSenderId: '628315527729',
	appId: '1:628315527729:web:d16b8b96af16a433fa1310',
}

// Initialize Firebase if it's not already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)
//const auth = getAuth(app)
//const functions = getFunctions(app)
const storage = getStorage(app)

export { db, storage }
