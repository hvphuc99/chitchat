import moment from "moment";

export const formatTime = (timestamp) => {
  let formatTime = null;
  if (timestamp) {
    formatTime = moment.unix(timestamp).format("ll");
  } else {
    // Do nothing
  }
  return formatTime;
}

export const formatTimeFull = (timestamp) => {
  let formatTime = null;
  if (timestamp) {
    formatTime = moment.unix(timestamp).format("lll");
  } else {
    // Do nothing
  }
  return formatTime;
}