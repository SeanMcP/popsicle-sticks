import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCmTGN98FvLXIPhKIrbj6wjjMCMI00n69I",
    authDomain: "seanmcp-popsicle-sticks.firebaseapp.com",
    databaseURL: "https://seanmcp-popsicle-sticks.firebaseio.com",
    projectId: "seanmcp-popsicle-sticks",
    storageBucket: "seanmcp-popsicle-sticks.appspot.com",
    messagingSenderId: "719270873844"
};

firebase.initializeApp(config);

export default firebase;