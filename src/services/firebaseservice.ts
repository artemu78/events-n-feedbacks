import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
} from 'firebase/auth';
import { get, ref, set, update } from 'firebase/database';

import { User } from '@/types';

import { auth, db } from './firebaseconfig';

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
  providerClass: any,
) => {
  const result = await signInWithPopup(auth, providerInstance);
  // This gives you a Google Access Token. You can use it to access Google APIs.
  const credential = providerClass.credentialFromResult(result);
  return { result, credential };
};

const signInWithGenericProvider = async (
  providerInstance: any,
  providerClass: any,
) => {
  try {
    const { result, credential } = await getGenericProviderResult(
      providerInstance,
      providerClass,
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

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const registerUserLogin = async (user: User) => {
  try {
    const { uid, displayName, email, photoURL } = user;
    const userReference = ref(db, `users/${uid}`);
    const snapshot = await get(userReference);
    if (snapshot.exists()) {
      update(userReference, {
        lastlogin: new Date().toISOString(),
        displayName,
        email,
        photoURL,
      });
    } else {
      set(userReference, {
        lastlogin: new Date().toISOString(),
        registerdate: new Date().toISOString(),
        displayName,
        email,
        photoURL,
      });
    }
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
};
