import { db } from "services/firebase";

const messageApi = {
  getGroupChatList: (userId) => {
    return new Promise((resolve, reject) => {
      db.ref("/groupChats").on("value", (snapshot) => {
        const groupChats = snapshot.val();
        let list = [];
        for (let groupChatKey in groupChats) {
          const { members } = groupChats[groupChatKey];
          for (let memberKey in members) {
            if (members[memberKey] === userId) {
              list = list.concat(groupChats[groupChatKey]);
            }
          }
        }
        resolve(list);
      });
    });
  },
  getLastMessage: (groupChatId) => {
    return new Promise((resolve, reject) => {
      db.ref("/groupChats/" + groupChatId + "/messages/").orderByChild("timestamp").limitToLast(1).on("value", (snapshot) => {
        const lastMessage = Object.values(snapshot.val())[0];
        resolve(lastMessage);
      });
    });
  },
  getMessageList: (groupChatId) => {
    return new Promise((resolve, reject) => {
      db.ref("/groupChats/" + groupChatId + "/messages").orderByChild("timestamp").on("value", (snapshot) => {
        const messageList = Object.values(snapshot.val());
        resolve(messageList);
      })
    });
  },
  sendMessage: (senderId, groupChatId, content, type) => {
    const timestamp = Date.now();
    return new Promise((resolve, reject) => {
      db.ref("/groupChats/" + groupChatId + "/messages/" + timestamp).set({
        senderId,
        content,
        type,
        timestamp,
      })
    });
  },
};

export default messageApi;
