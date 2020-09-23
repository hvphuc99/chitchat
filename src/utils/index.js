import moment from "moment";

export const formatTimeLL = (timestamp) => {
  let formatTime = null;
  if (timestamp) {
    formatTime = moment.unix(timestamp).format("LL");
  } else {
    // Do nothing
  }
  return formatTime;
}

export const formatTimeLLL = (timestamp) => {
  let formatTime = null;
  if (timestamp) {
    formatTime = moment.unix(timestamp).format("LLL");
  } else {
    // Do nothing
  }
  return formatTime;
}