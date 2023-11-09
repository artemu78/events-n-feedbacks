import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
} from "firebase/auth";

import { auth } from "./firebaseconfig";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

interface IError {
  code: string;
  message: string;
  customData: {
    email: string;
  };
}

const getGenericProviderResult = async (
  providerInstance: any,
  providerClass: any
) => {
  const result = await signInWithPopup(auth, providerInstance);
  // This gives you a Google Access Token. You can use it to access Google APIs.
  const credential = providerClass.credentialFromResult(result);
  return { result, credential };
};

const signInWithGenericProvider = async (
  providerInstance: any,
  providerClass: any
) => {
  try {
    const { result, credential } = await getGenericProviderResult(
      providerInstance,
      providerClass
    );
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;

    return { user };
    // ...
    // Handle the signed-in user information (e.g., store in state, redirect, etc.)
  } catch (error: IError | any) {
    // Handle Errors here.
    const errorCode = error?.code;
    const errorMessage = error?.message;
    // The email of the user's account used.
    const email = error?.customData?.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    return { error };
    // ...
    // Handle errors here
  }
};

export const signInWithFacebook = async () => {
  return signInWithGenericProvider(facebookProvider, FacebookAuthProvider);
};

export const signInWithGoogle = async () => {
  return signInWithGenericProvider(googleProvider, GoogleAuthProvider);
};

export const signInWithTwitter = async () => {
  return signInWithGenericProvider(twitterProvider, TwitterAuthProvider);
};

export const signInWithGoogle_old = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;

    return { user };
    // ...
    // Handle the signed-in user information (e.g., store in state, redirect, etc.)
  } catch (error: IError | any) {
    // Handle Errors here.
    const errorCode = error?.code;
    const errorMessage = error?.message;
    // The email of the user's account used.
    const email = error?.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    return { error };
    // ...
    // Handle errors here
  }
};

export const loginWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};