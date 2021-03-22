import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

export const signInWithPopUp=()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider()
   return  firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            const {displayName,email}=result.user
            const user={
                name:displayName,
                email:email
            }
            return user

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            // ...
            console.log(error)
        });
}
export const signInWithFB=()=>{
    console.log("I am entering2")
     const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;

            const { displayName, email } = result.user
            const user = {
                name: displayName,
                email: email
            }
            return user

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error)
        });
}

export const createUserWithMail=(email,password)=>{
    
    console.log("called by a functiion")
    debugger
    return  firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            console.log("Creating User")
            return user
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
            // ..
        });

}
export const updateUsername=(name)=>{
    const user = firebase.auth().currentUser;

    return user.updateProfile({
        displayName:name,
    }).then(function () {
        // Update successful.
    }).catch(function (error) {
        console.log(error)
        // An error happened.
    });
}

 export const logOut=()=>{
   return  firebase.auth().signOut()
   .then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}; export default logOut;

export const logInWithEmail=(email,password)=>{
   return  firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            return user
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}