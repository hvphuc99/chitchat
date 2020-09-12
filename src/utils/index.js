export const convertTimestampFull = (timestamp) => {
  const date = new Date(timestamp);
  return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " AT " + date.getHours() + ":" + date.getMinutes();
}

export const convertTimestamp = (timestamp) => {
  if (!timestamp) return;
  const date = new Date(timestamp);
  return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
}