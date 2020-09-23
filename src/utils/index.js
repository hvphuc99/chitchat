import moment from "moment";

export const formatTimeLL = (timestamp) => {
  return moment.unix(timestamp).format("LL");
}

export const formatTimeLLL = (timestamp) => {
  return moment.unix(timestamp).format("LLL");
}