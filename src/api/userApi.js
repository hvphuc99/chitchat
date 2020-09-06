import { auth } from "services/firebase";
import firebase from "firebase";

const userApi = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          if (res.user.emailVerified) {
            res.user.getIdToken().then((token) => {
              resolve(token);
            });
          } else {
            reject("Email not verify");
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  signUp: (firstName, lastName, email, password, confirmPassword) => {
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.sendEmailVerification();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  resetPassword: (email) => {
    return new Promise((resolve, reject) => {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  },
  loginWithGoogle: () => {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      auth()
        .signInWithPopup(provider)
        .then((res) => {
          const token = res.credential.accessToken;
          resolve(token);
        })
        .catch((err) => reject(err));
    });
  },
  loginWithFacebook: () => {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      auth()
        .signInWithPopup(provider)
        .then((res) => {
          const token = res.credential.accessToken;
          resolve(token);
        })
        .catch((err) => reject(err));
    });
  },
};
export default userApi;
