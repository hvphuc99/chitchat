import { db } from "services/firebase";

const messageApi = {
  getGroupChatList: (userId) => {
    return new Promise((resolve, reject) => {
      db.collection("messages")
        .where("members", "array-contains", userId)
        .get()
        .then((queryGroupChatList) => {
          const groupChatList = queryGroupChatList.docs.map((groupChat) => {
            let { groupChatId, groupChatName, members } = groupChat.data();
            return {
              groupChatId,
              groupChatName,
              members,
            };
          });
          resolve(groupChatList);
        })
        .catch((err) => reject(err));
    });
  },
  getLastMessage: (groupChatId) => {
    return new Promise((resolve, reject) => {
      db.collection("messages")
        .doc(groupChatId)
        .collection(groupChatId)
        .orderBy("timestamp", "desc")
        .limit(1)
        .get()
        .then((lastMessage) => {
          resolve(lastMessage.docs[0].data());
        })
        .catch((err) => reject(err));
    });
  },
  getMessageList: (groupChatId) => {
    return new Promise((resolve, reject) => {
      db.collection("messages")
        .doc(groupChatId)
        .collection(groupChatId)
        .get()
        .then((queryMessageList) => {
          const list = queryMessageList.docs.map((message) => {
            return message.data();
          });
          resolve(list);
        })
        .catch((err) => reject(err));
    });
  },
  sendMessage: (senderId, groupChatId, content, type) => {
    const timestamp = Date.now();
    return new Promise((resolve, reject) => {
      db.collection("messages")
        .doc(groupChatId)
        .collection(groupChatId)
        .doc(timestamp.toString())
        .set({
          senderId,
          content,
          timestamp,
          type,
        })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  },
};

export default messageApi;
