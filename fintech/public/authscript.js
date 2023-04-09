const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

// Initialize Firebase
// console.log("lsfj");

// Get references to elements in the DOM
// var loginForm = document.querySelector('#login-form');
// var emailInput = document.querySelector('#email');
// var passwordInput = document.querySelector('#password');
// var loginBtn = document.querySelector('#login-btn');
// var loginerror = document.querySelector('#login-error');

// var signupForm = document.querySelector('#signup-form');
// var signupEmailInput = document.querySelector('#signup-email');
// var signupPasswordInput = document.querySelector('#signup-password');
// var signupBtn = document.querySelector('#signup-btn');
// var signuperror = document.querySelector('#signup-error');

// function authe() {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       location.replace('/');
//     }
//   });
// }
// // Add event listener for login form submit
// loginForm.addEventListener('submit', function (event) {
//   event.preventDefault(); // prevent the form from submitting

//   // Get user inputs
//   var email = emailInput.value;
//   var password = passwordInput.value;
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then(function (userCredential) {
//       // User signed in successfully
//       console.log('User signed in successfully');
//       // Clear form fields
//       emailInput.value = '';
//       passwordInput.value = '';
//       // window.location.href = '../Home/home.html';

//       authe();
//       // Check if the user is logged in or not
//       // if (auth.currentUser) {
//       //   // User is signed in
//       //   console.log('hello');
//       //   console.log('User is signed in with UID: helllo', auth.currentUser.uid);
//       //   // Redirect to the home page or dashboard
//       //   //   window.location.href = "home.html";
//       // } else {
//       //   // User is signed out
//       //   document.getElementById('mainbtn').innerHTML = 'LogOut';
//       //   console.log('User is signed hello out');
//       //   // Redirect to the login page
//       //   //   window.location.href = "login.html";
//       // }










//     })
//     .catch(function (error) {
//       // Handle errors
//       console.error('Error signing in:', error.message);
//       loginerror.innerHTML = error.message;

//     });
// });

// // Add event listener for signup form submit
// signupForm.addEventListener('submit', function (event) {
//   event.preventDefault(); // prevent the form from submitting

//   // Get user inputs
//   var email = signupEmailInput.value;
//   var password = signupPasswordInput.value;
  
//   // Create new user with Firebase
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then(function (userCredential) {
//       // User created successfully
//       console.log('User created successfully');
//       // Clear form fields
//       signupEmailInput.value = '';
//       signupPasswordInput.value = '';
//       // window.location.href = "../Home/home.html";


//       authe();


//       // Check if the user is logged in or not
//       // if (auth.currentUser) {
//       //   // User is signed in
//       //   console.log('hello');
//       //   console.log('User is signed in with UID: helllo', auth.currentUser.uid);
//       //   // Redirect to the home page or dashboard
//       //   //   window.location.href = "home.html";
//       // } else {
//       //   // User is signed out
//       //   document.getElementById('mainbtn').innerHTML = 'LogOut';
//       //   console.log('User is signed hello out');
//       //   // Redirect to the login page
//       //   //   window.location.href = "login.html";
//       // }




//     })
//     .catch(function (error) {
//       // Handle errors
//       console.error('Error creating user:', error.message);
//       signuperror.innerHTML = error.message;
//     });
// });









// // Check if the user is logged in or not
// // if (auth.currentUser) {
// //   // User is signed in
// //     console.log("hello");
// //   console.log("User is signed in with UID: helllo", auth.currentUser.uid);
// //   // Redirect to the home page or dashboard
// // //   window.location.href = "home.html";
// // } else {
// //   // User is signed out
// //     // document.getElementById("mainbtn").innerHTML = "LogOut";
// //   console.log("User is signed hello out");
// //   // Redirect to the login page
// // //   window.location.href = "login.html";
// // }














// // Get a reference to the Firebase Auth service
// // const auth = firebase.auth();

// // Get a reference to the logout button
// // const logoutBtn = document.getElementById("logout-btn");

// // // Attach a click event listener to the logout button
// // logoutBtn.addEventListener("click", function() {
// //   // Sign out the current user
// //   auth.signOut().then(function() {
// //     // Redirect to the login page or homepage
// //     window.location.href = "/";
// //   }).catch(function(error) {
// //     // Handle errors here
// //     console.log(error.message);
// //   });
// // });
