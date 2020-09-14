import { auth, db } from "services/firebase";
import firebase from "firebase";

const userApi = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          const user = res.user;
          const id = user.uid;
          if (user.emailVerified) {
            user.getIdToken().then((token) => {
              resolve({
                id,
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
          const {isNewUser} = res.additionalUserInfo;
          if (isNewUser) {
            const user = res.user;
            const id = user.uid;
            user.sendEmailVerification();
            db.ref("/users/" + id).set({
              id,
              firstName,
              lastName,
              picture: "",
            }, (err) => {
              if (err) {
                reject("An error happened");
              } else {
                resolve(true);
              }
            });
          } else {
            reject("Email address is already used")
          }
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
      auth
        .signInWithPopup(provider)
        .then((res) => {
          const user = res.user;
          const id = user.uid;
          const { isNewUser } = res.additionalUserInfo;
          const {
            family_name,
            given_name,
            picture,
          } = res.additionalUserInfo.profile;
          if (isNewUser) {
            db.ref("/users/" + id).set({
              id,
              firstName: given_name,
              lastName: family_name,
              picture,
            }, (err) => {
              if (err) {
                reject("An error happened");
              }
            });
          }
          user.getIdToken().then((token) => {
            resolve({
              id,
              token,
            });
          });
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
          resolve("Logout successful");
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
      db.ref("/users/" + userId)
        .once("value")
        .then((userInfo) => {
          const { firstName, lastName, picture } = userInfo.val();
          resolve({
            firstName,
            lastName,
            picture,
          });
        })
        .catch((err) => reject(err));
    });
  },
};
export default userApi;
