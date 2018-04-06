import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyD-Y80B4mrLDvA_xh_L3_KHw5vQX_zpx0U",
    authDomain: "prueba2-f1de1.firebaseapp.com",
    databaseURL: "https://prueba2-f1de1.firebaseio.com",
    projectId: "prueba2-f1de1",
    storageBucket: "prueba2-f1de1.appspot.com",
    messagingSenderId: "935799279312"
}

firebase.initializeApp(config)

export default {
    database: firebase.database(),
    storage: firebase.storage()
}