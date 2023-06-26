  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  import { getAuth} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  import { getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"; 

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

const auth = getAuth(app);
const database = getDatabase();

//register function

const signupbtn = document.getElementById("signup");
function register() {
    const username = document.getElementById("username").value;
    const usernamestyle = document.getElementById("username").style;
    const password = document.getElementById("password").value;
    const alreadyuse = document.getElementById("alreadyuse");
    const usernames = ref(database, 'users/' + username + '/username');

    if (validateField(username, password) == false) {
      return;  
    };
    const dbref = ref(getDatabase());
    get(child(dbref, "users/" + username)).then((snapshot) => {
        if (snapshot.exists()) {
            //alert("Username already exists!");
            usernamestyle.borderColor = "red";
            alreadyuse.hidden = false
            return;
        } else {
            set(ref(database, 'users/' + username), {
                username: username,
                password: password
                
            });
            window.location.replace('login.html');
        }
    });
}
function validateField(username, password) {

    if (username.length <= 0 || password.length <= 0) {
        alert('type something!');
        return false;
    } else {
        return true;
    }
}



signupbtn.onclick = function() {
    console.log('attempting to sign up');
    register();

};