const firebase = require("firebase")

const firebaseConfig = {
    apiKey: "AIzaSyAhwRzKQf87u48pZnleG9C84XgtkT9iWco",
    authDomain: "smartvest-ee171.firebaseapp.com",
    projectId: "smartvest-ee171",
    storageBucket: "smartvest-ee171.appspot.com",
    messagingSenderId: "394569252450",
    appId: "1:394569252450:web:b63b2bc4b2e2e489201b3b",
    measurementId: "G-1B34GK56YT"
  }

  const app = initializeApp(firebaseConfig)
  const db = app.firestore()