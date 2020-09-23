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
          const { isNewUser } = res.additionalUserInfo;
          if (isNewUser) {
            const user = res.user;
            const id = user.uid;
            user.sendEmailVerification();
            db.ref("/users/" + id).set(
              {
                id,
                firstName,
                lastName,
                picture: "",
              },
              (err) => {
                if (err) {
                  reject("An error happened");
                } else {
                  resolve(true);
                }
              }
            );
          } else {
            reject("Email address is already used");
          }
        })
        .catch((err) => {
          reject("Email address is already used");
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
            db.ref("/users/" + id).set(
              {
                id,
                firstName: given_name,
                lastName: family_name,
                picture,
              },
              (err) => {
                if (err) {
                  reject("An error happened");
                }
              }
            );
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
          const {
            id,
            firstName,
            lastName,
            picture,
            sendFriendRequests,
            receiveFriendRequests,
            friends,
          } = userInfo.val();
          resolve({
            id,
            firstName,
            lastName,
            picture,
            sendFriendRequests,
            receiveFriendRequests,
            friends,
          });
        })
        .catch((err) => reject(err));
    });
  },
  searchUser: (searchTerm) => {
    return new Promise((resolve, reject) => {
      searchTerm = searchTerm.trim();
      searchTerm = searchTerm.replace(/\s\s+/g, " ");
      searchTerm = searchTerm.toLowerCase();
      if (!searchTerm) resolve([]);
      db.ref("/users")
        .once("value")
        .then((queryUsers) => {
          const users = queryUsers.val();
          let userList = [];
          for (let userKey in users) {
            const user = users[userKey];
            let name = user.firstName + " " + user.lastName;
            name = name.trim();
            name = name.replace(/\s\s+/g, " ");
            name = name.toLowerCase();
            if (name.indexOf(searchTerm) !== -1) {
              userList = userList.concat(user);
            }
          }
          resolve(userList);
        });
    });
  },
  sendFriendRequest: (idFrom, idTo) => {
    const timestamp = Date.now();
    return new Promise((resolve, reject) => {
      db.ref("/users/" + idFrom + "/sendFriendRequests/" + idTo).set(
        {
          id: idTo,
          timestamp,
        },
        (err) => {
          if (err) reject("An error happened");
        }
      );
      db.ref("/users/" + idTo + "/receiveFriendRequests/" + idFrom).set(
        {
          id: idFrom,
          timestamp,
        },
        (err) => {
          if (err) reject("An error happened");
        }
      );
      resolve("Send request successful");
    });
  },
  removeFriendRequest: (idFrom, idTo) => {
    return new Promise((resolve, reject) => {
      db.ref("/users/" + idFrom + "/sendFriendRequests/" + idTo).remove(
        (err) => {
          if (err) reject("An error happened");
        }
      );
      db.ref("/users/" + idTo + "/receiveFriendRequests/" + idFrom).remove(
        (err) => {
          if (err) reject("An error happened");
        }
      );
      resolve("Cancel request successful");
    });
  },
  friendRequestsListener: (userId, handleData) => {
    return db
      .ref("/users/" + userId + "/receiveFriendRequests")
      .on("value", handleData);
  },
  acceptFriendRequest: (userId, senderId) => {
    return new Promise((resolve, reject) => {
      db.ref("/users/" + userId + "/friends/" + senderId).set(
        senderId,
        (err) => {
          if (err) reject("An error happened");
        }
      );
      db.ref("/users/" + senderId + "/friends/" + userId).set(userId, (err) => {
        if (err) reject("An error happened");
      });
      db.ref("/users/" + userId + "/receiveFriendRequests/" + senderId).remove(
        (err) => {
          if (err) reject("An error happened");
        }
      );
      db.ref("/users/" + senderId + "/sendFriendRequests/" + userId).remove(
        (err) => {
          if (err) reject("An error happened");
        }
      );
      resolve("Accept request successful");
    });
  },
  deleteFriendRequest: (userId, senderId) => {
    return new Promise((resolve, reject) => {
      db.ref("/users/" + userId + "/receiveFriendRequests/" + senderId).remove(
        (err) => {
          if (err) reject("An error happened");
        }
      );
      db.ref("/users/" + senderId + "/sendFriendRequests/" + userId).remove(
        (err) => {
          if (err) reject("An error happened");
        }
      );
      resolve("Delete request successful");
    });
  },
  friendsListener: (userId, handleData) => {
    return db
      .ref("/users/" + userId + "/friends")
      .on("value", handleData);
  },
  removeFriend: (userId, friendId) => {
    return new Promise((resolve, reject) => {
      db.ref("/users/" + userId + "/friends/" + friendId).remove(
        (err) => {
          if (err) reject("An error happened");
        }
      );
      db.ref("/users/" + friendId + "/friends/" + userId).remove(
        (err) => {
          if (err) reject("An error happened");
        }
      );
      resolve("remove friend successful");
    });
  },
};
export default userApi;
