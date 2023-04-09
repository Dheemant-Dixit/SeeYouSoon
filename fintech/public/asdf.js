// Get a reference to the logout button
// const logoutBtn = document.getElementById("logout-btn");

// // Attach a click event listener to the logout button
// logoutBtn.addEventListener("click", function() {
//   // Sign out the current user
//     auth.signOut().then(function () {
//         logoutBtn.innerHTML = "Login?signup";
//     // Redirect to the login page or homepage
//     // window.location.href = "./authentication.html";
//   }).catch(function(error) {
//     // Handle errors here
//       alert(error.message);
//     console.log(error.message);
//   });
// });

// // Check the authentication state
// auth.onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in
//     console.log("User is signed in with UID:", user.uid);
//     // Redirect to the home page or dashboard
//     // window.location.href ="../authentication/";
//   } else {
//     // User is signed out
//     console.log("User is signed out");
//     // Redirect to the login page
//     // window.location.href = "login.html";
//   }
// });

// // // Check if the user is logged in or not
// if (auth.currentUser) {
//   // User is signed in
//     console.log("hello");
//   console.log("User is signed in with UID: helllo", auth.currentUser.uid);
//   // Redirect to the home page or dashboard
// //   window.location.href = "home.html";
// } else {
//   // User is signed out
//     document.getElementById("mainbtn").innerHTML = "LogOut";
//   console.log("User is signed hello out");
//   // Redirect to the login page
// //   window.location.href = "login.html";
// }

// document.getElementById('mainbtn').addEventListener('click', () => {
//   if (auth.currentUser) {
//     document.getElementById('mainbtn').innerHTML = 'LogIn/SignUp';
//     // User is signed in
//     console.log('hello');
//     firebase.auth().signOut();
//     // console.log('User is signed in with UID: helllo', auth.currentUser.uid);
//     // Redirect to the home page or dashboard
//     //   window.location.href = "home.html";
//   } else {
//     // User is signed out
//     location.replace('/authentication');
//     document.getElementById('mainbtn').innerHTML = 'LogOut';
//     console.log('User is signed hello out');
//     // Redirect to the login page
//     //   window.location.href = "login.html";
//   }

//   // firebase.auth().onAuthStateChanged((user) => {
//   //   // console.log(user);
//   //   if (!user) {
//   //     location.replace('../authentication/authentication.html');
//   //     // console.log('sljfls');
//   //     // document.getElementById('mainbtn').innerHTML = 'LogIn/SignUp';
//   //   } else {
//   //     // document.getElementById('mainbtn').innerHTML = 'LogOut';
//   //     // console.log('lds');
//   //     firebase.auth().signOut();
//   //   }
//   // });
// });
// function hh() {
//   if (auth.currentUser) {
//     document.getElementById('mainbtn').innerHTML = 'LogIn/SignUp';
//     // User is signed in
//     console.log('hello');
//     firebase.auth().signOut();
//     // console.log('User is signed in with UID: helllo', auth.currentUser.uid);
//     // Redirect to the home page or dashboard
//     //   window.location.href = "home.html";
//   } else {
//     // User is signed out
//     location.replace('/authentication');
//     document.getElementById('mainbtn').innerHTML = 'LogOut';
//     console.log('User is signed hello out');
//     // Redirect to the login page
//     //   window.location.href = "login.html";
//   }
// }

// firebase.auth().onAuthStateChanged((user) => {
//   console.log(user);
//   if (!user) {
//     // location.replace('login.html');
//     console.log('sljfls');
//     document.getElementById('mainbtn').innerHTML = 'LogIn/SignUp';
//     document.getElementById('maintn').innerHTML = 'LogIn/SignUp';
//   } else {
//     document.getElementById('mainbtn').innerHTML = 'LogOut';
//     document.getElementById('maintn').innerHTML = 'LogOut';
//     console.log('lds');
//   }
// });
