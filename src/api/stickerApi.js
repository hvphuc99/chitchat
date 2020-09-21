import { db } from "services/firebase";

const stickerApi = {
  getPiyomaruSticker: () => {
    return new Promise((resolve, reject) => {
      db.ref("/stickers/piyomaru")
        .once("value")
        .then((queryUrls) => {
          const urls = queryUrls.val();
          urls.sort();
          resolve(urls);
        })
        .catch((err) => {
          reject(err);
        })
    });
  },
  getSpeedyUsagyuuunSticker: () => {
    return new Promise((resolve, reject) => {
      db.ref("/stickers/speedyUsagyuuun")
        .once("value")
        .then((queryUrls) => {
          const urls = queryUrls.val();
          urls.sort();
          resolve(urls);
        })
        .catch((err) => {
          reject(err);
        })
    });
  },
  getBluesBearSticker: () => {
    return new Promise((resolve, reject) => {
      db.ref("/stickers/bluesBear")
        .once("value")
        .then((queryUrls) => {
          const urls = queryUrls.val();
          urls.sort();
          resolve(urls);
        })
        .catch((err) => {
          reject(err);
        })
    });
  },
};

export default stickerApi;
