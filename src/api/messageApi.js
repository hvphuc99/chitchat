import { db } from "services/firebase";
import * as typeMessages from "constants/typeMessage";
import timeApi from "./timeApi";

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
  sendMessage: async (
    senderId,
    groupChatId,
    content,
    type = typeMessages.TEXT
  ) => {
    const timestamp = await timeApi.getCurrentUnixTime();
    db.ref("/groupChats/" + groupChatId)
      .once("value")
      .then((groupChat) => {
        debugger
        if (!groupChat.val()) {
        debugger
        let members = [];
          members[0] = groupChatId.slice(0, groupChatId.indexOf("-"));
          members[1] = groupChatId.slice(groupChatId.indexOf("-") + 1);
          db.ref("/groupChats/" + groupChatId).set(
            {
              id: groupChatId,
              members,
              name: "",
            },
            (err) => {
              if (err) return;
              db.ref(
                "/groupChats/" + groupChatId + "/messages/" + timestamp
              ).set({
                senderId,
                content,
                type,
                timestamp,
              });
            }
          );
        } else {
          db.ref("/groupChats/" + groupChatId + "/messages/" + timestamp).set({
            senderId,
            content,
            type,
            timestamp,
          }, (err) => {
            debugger
          });
        }
      });
  },
};

export default messageApi;
