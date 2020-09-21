import { storage } from "services/firebase";

const storageApi = {
  uploadPhoto: (image) => {
    return new Promise((resolve, reject) => {
      const { name } = image;
      const fileName = name.slice(0, name.indexOf("."));
      const fileType = name.slice(name.indexOf(".") + 1);
      const currentTimestamp = Date.now();
      const nameStandard = fileName + "_" + currentTimestamp + "." + fileType;
      const uploadTask = storage
        .ref()
        .child("photos/" + nameStandard)
        .put(image);
      uploadTask.on(
        "state_changed",
        null,
        (err) => {
          reject(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            resolve(url);
          });
        }
      );
    });
  },
  uploadOtherFile: (otherFile) => {
    return new Promise((resolve, reject) => {
      const { name } = otherFile;
      const fileName = name.slice(0, name.indexOf("."));
      const fileType = name.slice(name.indexOf(".") + 1);
      const currentTimestamp = Date.now();
      const nameStandard = fileName + "_" + currentTimestamp + "." + fileType;
      const uploadTask = storage
        .ref()
        .child("other/" + nameStandard)
        .put(otherFile);
      uploadTask.on(
        "state_changed",
        null,
        (err) => {
          reject(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            resolve(url);
          });
        }
      );
    });
  },
};

export default storageApi;
