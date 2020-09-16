import { db } from "services/firebase";

const messageApi = {
  groupChatsListener: (userId, handleData) => {
    return db.ref("/groupChats").on("value", handleData);
  },
  getLastMessage: (groupChatId) => {
    return new Promise((resolve, reject) => {
      db.ref("/groupChats/" + groupChatId + "/messages/")
        .orderByChild("timestamp")
        .limitToLast(1)
        .once("value")
        .then((message) => {
          if (!message.val()) {
            resolve("");
          } else {
            const lastMessage = Object.values(message.val())[0];
          resolve(lastMessage);
          }
        });
    });
  },
  messageListListener: (groupChatId, handleData) => {
    return db
      .ref("/groupChats/" + groupChatId + "/messages")
      .on("value", handleData);
  },
  sendMessage: (senderId, groupChatId, content, type) => {
    const timestamp = Date.now();
    return new Promise((resolve, reject) => {
      db.ref("/groupChats/" + groupChatId + "/messages/" + timestamp).set({
        senderId,
        content,
        type,
        timestamp,
      });
    });
  },
};

export default messageApi;
