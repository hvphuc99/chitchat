import moment from "moment";

export const formatTimell = (timestamp) => {
  let formatTime = null;
  if (timestamp) {
    formatTime = moment.unix(timestamp).format("ll");
  } else {
    // Do nothing
  }
  return formatTime;
}

export const formatTimelll = (timestamp) => {
  let formatTime = null;
  if (timestamp) {
    formatTime = moment.unix(timestamp).format("lll");
  } else {
    // Do nothing
  }
  return formatTime;
}