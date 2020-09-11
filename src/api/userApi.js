import { auth, db } from "services/firebase";
import firebase from "firebase";

const userApi = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          if (res.user.emailVerified) {
            res.user.getIdToken().then((token) => {
              resolve({
                id: res.user.uid,
                token: token,
              });
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
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const user = res.user;
          user.sendEmailVerification();
          db.collection("users").doc(user.uid).set({
            id: user.uid,
            firstName: firstName,
            lastName: lastName,
          });
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  resetPassword: (email) => {
    return new Promise((resolve, reject) => {
      auth
        .sendPasswordResetEmail(email)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  },
  loginWithGoogle: () => {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      auth
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
      auth
        .signInWithPopup(provider)
        .then((res) => {
          const token = res.credential.accessToken;
          resolve(token);
        })
        .catch((err) => reject(err));
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          resolve("Log out successful");
        })
        .catch(() => reject("An error happened"));
    });
  },
  verifyToken: (authToken) => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((token) => {
            if (token === authToken) {
              resolve(user.uid);
            } else {
              resolve(null);
            }
          });
        } else {
          resolve(null);
        }
      });
    });
  },
  getUserInfo: (userId) => {
    return new Promise((resolve, reject) => {
      db.collection("users")
        .where("id", "==", userId)
        .get()
        .then((queryUser) => {
          const { firstName, lastName } = queryUser.docs[0].data();
          resolve({
            firstName,
            lastName,
          });
        })
        .catch((err) => reject(err));
    });
  },
};
export default userApi;
