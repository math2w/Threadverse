  // Code written by Math2w.

  // its a mess :(
  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  import { getAuth} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  import { getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"; 
  import {getStorage, ref as sref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js"; 



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

  // get our firebase stuff.
const auth = getAuth(app);
const database = getDatabase();
const storage = getStorage();


const signupbtn = document.getElementById("signup");
const loginbtn = document.getElementById("login");
const postbtn = document.getElementById('postbtn');
const fileupload = document.getElementById("fileInput");
const changetext = document.getElementById("chosen");
var fileupload2 = document.getElementById("imageinput");
var pfp = document.getElementById("profileimage");

//get values and change them in firebase.

async function getValueFromDatabase(childKey) {
  try {
    const databaseRef = ref(database); // Reference to the root of the Firebase Realtime Database

    // Find the value using the provided child key
    const snapshot = await get(child(databaseRef, childKey));
    const value = snapshot.val();

    if (value !== null) {
      if (value != "") {
        pfp.src = value;
        
      } else {
        pfp.src = "images/profile.png";
      }
      var hidediv = document.getElementById("hidediv");
      hidediv.hidden = false;

      return value;
    } else {
      
    }
  } catch (error) {
    console.error('Error occurred while getting the value:', error);
    return null;
  }
}

async function findAndChangeValue(childKey, newValue) {
  try {
    const databaseRef = ref(database); // Reference to the root of the Firebase Realtime Database


    // Find the current value
    const snapshot = await get(child(databaseRef, childKey));
    const currentValue = snapshot.val();

    if (currentValue !== null) {
      

      // Set the new value back to Firebase
      await set(child(databaseRef, childKey), newValue);


    } else {

    }
  } catch (error) {
    console.error('Error occurred while updating the value:', error);
  }
}

//register function


function register() {
    const username = document.getElementById("password").value;
    const usernamestyle = document.getElementById("username").style;
    const password = document.getElementById("username").value;
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
                password: password,
                profilepic: ""
                
            });
            window.location.replace('login.html');
        }
    });
}

// The login function

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const usernames = ref(database, 'users/' + username + '/username');
    const passwords = ref(database, 'users/' + password + '/username');
    const usernamestyle = document.getElementById("username").style;
    const passwordStyle = document.getElementById("password").style;
    const wrongtext = document.getElementById("wrongtext");


    if (validateField(username, password) == false) {
        return;  
      };
      const dbref = ref(getDatabase());

      get(child(dbref, 'users/' + username)) && get(child(dbref, 'users/' + password)).then((snapshot) => {
        if (snapshot.exists()) {
            document.cookie = "username=" + username + ";" + "expires=" + new Date(2038,0,1).toUTCString();
            document.cookie = "password=" + password + ";" + "expires=" + new Date(2038,0,1).toUTCString();
            window.location.replace('mainpage.html');

        } else {

            usernamestyle.borderColor = "red";
            passwordStyle.borderColor = "red";
            wrongtext.hidden = false;

        }
        
      });
}

// upload image to imgur

async function uploadToImgur(imageFile) {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: "Client-ID 7918f28944dd9b6"
      },
      body: formData
    });

    const data = await response.json();
    return data.data.link;
  } catch (error) {
    console.error('Error uploading image to Imgur:', error);
    return null;
  }
}

function validateField(username, password) {

    if (username.length <= 0 || password.length <= 0) {
        alert('type something!');
        return false;
    } else {
        return true;
    }
}

function getCookie(name) {
    // Split all cookies into an array
    var cookies = document.cookie.split(';');
  
    // Loop through the cookies
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
  
      // Trim leading and trailing spaces
      cookie = cookie.trim();
  
      // Check if the cookie starts with the name we're looking for
      if (cookie.indexOf(name + '=') === 0) {
        // Extract and return the cookie value
        return cookie.substring(name.length + 1, cookie.length);
      }
    }
  
    // Cookie not found
    return null;
  }


  function uuidv4() {
    return Math.floor(Math.random() * 999999999999999);
  }
  


  async function post() {
    const titletext = document.getElementById("title");
    const desctext = document.getElementById("description");


    if (titletext.value.length <= 0) {
      alert('Write something in the title box!');
      return;
    }
    const dref = ref(getDatabase());
    const stref = sref(storage, 'images/');
    const id = uuidv4();
    const dateObject = new Date();  
    
    let datetime = dateObject.toLocaleString();
    let date = datetime.split(' ', 5).join(' ');
    
    var imgurLink = "";
    if (fileupload.files[0] != null) {
        var file = fileupload.files[0];
        imgurLink = await uploadToImgur(file);
        if (imgurLink) {
          console.log('Image uploaded to Imgur:', imgurLink);
        } else {
          console.log('Image upload failed.');
          alert('Post failed to upload. Please try again.');
          window.location.reload();
        }
    } else {
      alert("Please upload a image");
      return;
    }

    var username = getCookie("username");

    const db = getDatabase();


      set(ref(db, "posts/" + id), {
        name: titletext.value,
        desc: desctext.value,
        image: imgurLink,
        timestamp: date,
        uid: id,
        user: username
  
      });
    
  alert("posted!");
  window.location.href = "mainpage.html";

  }

  async function upload(img) {
    var imgurLink2 = "";
  
        imgurLink2 = await uploadToImgur(img);
        if (imgurLink2) {
          console.log('Image uploaded to Imgur:', imgurLink2);
          // Display the link to the user
    var user = getCookie("password");
          findAndChangeValue("users/" + user + "/profilepic", imgurLink2);

          alert("profile Picture Changed!");
    window.location.reload();
          return imgurLink2;
        } else {
          console.log('Image upload failed.');
          alert('Image upload failed. Please try again.');
        }
    
  }

  if (fileupload2 != null) {



    var name = getCookie("password");
    

      
    var profileimg = getValueFromDatabase("users/" + name + "/profilepic");

    if (profileimg != null) {
      console.log(profileimg);
    }

    fileupload2.addEventListener("change", function() {
        
      var imgfile = fileupload2.files[0];
      
          console.log("change");
  
      if (imgfile.size > 20000000) {
        alert("Image size is too big, please choose a image thats under 20MB");
        imgfile = null;
        return;
      }
  
    upload(imgfile);
  
      const fileread = new FileReader();
      fileread.readAsDataURL(imgfile);
      console.log("done");
      fileread.addEventListener("load", function() {
        pfp.src = this.result;
      })
      
    });
  }

if (signupbtn != null) {
signupbtn.onclick = function() {
    console.log('attempting to sign up');
    register();

}
};

if (fileupload != null) {
  fileupload.onchange = function() {
    var file = fileupload.files[0];
    if (file.size > 20000000) {
      alert("Image size is too big, please choose a image thats under 20MB");
      file = null;
      return;
    }
    changetext.textContent = file.name;
  }
}


if (loginbtn != null) {
loginbtn.onclick = function() { 
    login();
}
};

if (postbtn != null) {
  postbtn.onclick = function() {
    post();
  }
};