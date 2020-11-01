import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA0zNNWldmIpbno-iBKn7emyQWWEux0bVA",
    authDomain: "clone-e250f.firebaseapp.com",
    databaseURL: "https://clone-e250f.firebaseio.com",
    projectId: "clone-e250f",
    storageBucket: "clone-e250f.appspot.com",
    messagingSenderId: "159161675309",
    appId: "1:159161675309:web:3a1d2020fababecf1c52a4",
    measurementId: "G-GZ1B9NWJ07"
};

firebase.initializeApp(firebaseConfig);

export default firebase;