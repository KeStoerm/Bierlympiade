import { getAuth, signInWithPopup, GoogleAuthProvider, User, setPersistence, browserLocalPersistence } from "firebase/auth";

export let currentUser: User | null;

export const authenticateWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  setPersistence(auth, browserLocalPersistence).then(() =>
    signInWithPopup(auth, provider)
      .then((result) => {
      }).catch((error) => {
        console.log(error);
      })
  );
}