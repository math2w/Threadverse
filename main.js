  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  import { getAuth} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  import { getDatabase} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"; 

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDuU0009XmoSpkn1ehmfLzqtKKNQ9NOsys",
    authDomain: "login-system-259fd.firebaseapp.com",
    projectId: "login-system-259fd",
    storageBucket: "login-system-259fd.appspot.com",
    messagingSenderId: "723301353539",
    appId: "1:723301353539:web:41754ed85876c50d9a2cf6",
    measurementId: "G-F09GE2SHLZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

const auth = getAuth();
const database = getDatabase();

//register function

const signupbtn = document.getElementById("signup");

function register() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");


    if (validateEmail(email == false) || validateField(email || password)) {
        return;
    }

    auth.createUserWithEmailAndPassword(email, password);
    then(function() {
        var user = auth.currentUser;
        alert("User registered");

        var databaseref = database.ref;

        var userdata = {
            email : email,
            last_login : Date.now()
        }

        databaseref.child('users/' + user.uid).set(userdata);
    })
    .catch(function(error) {
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message);
    })
}

function validateEmail(email) {
    const val = /^[^@]+@\w+(\.\w+)+\w$/;

    if (val.test(email) == true) {
        return true;

    } else {

        return false;
    }
}

function validateField(field) {
    if (field == null) {
        return false;
    }

    if (field.length <= 0) {
        return false;
    } else {
        return true;
    }
}

signupbtn.onclick = function() {
    register();
    alert('done!');
}