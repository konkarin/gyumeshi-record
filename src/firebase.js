import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDzEm0KxVevBWakCkMf_ibu10MtqC3YzGI',
  authDomain: 'gyumeshi-record.firebaseapp.com',
  databaseURL: 'https://gyumeshi-record.firebaseio.com',
  projectId: 'gyumeshi-record',
  storageBucket: 'gyumeshi-record.appspot.com',
  messagingSenderId: '362082962895',
  appId: '1:362082962895:web:d81f5e0b298263ac5956ba',
  measurementId: 'G-CWT7H5B954'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
