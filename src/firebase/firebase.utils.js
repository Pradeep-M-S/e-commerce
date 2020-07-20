import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCMfycdEZV4P3H0Sb09TourQVUfnDLQt1c",
  authDomain: "claw-db.firebaseapp.com",
  databaseURL: "https://claw-db.firebaseio.com",
  projectId: "claw-db",
  storageBucket: "claw-db.appspot.com",
  messagingSenderId: "1064680195516",
  appId: "1:1064680195516:web:3004606fd8213ffdd517b9",
  measurementId: "G-0VR5NC4Y7M",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Oops error creating user", error.message);
    }
  }

  return userRef; 
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
