export const convertTimestampFull = (timestamp) => {
  if (!timestamp) return;
  const currentDate = new Date(timestamp);
  const formatDate = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate().toString();
  const formatMonth = currentDate.getMonth() < 10 ? "0" + currentDate.getMonth() : currentDate.getMonth().toString();
  const formatFullYear = currentDate.getFullYear() < 10 ? "0" + currentDate.getFullYear() : currentDate.getFullYear().toString();
  const formatHours = currentDate.getHours() < 10 ? "0" + currentDate.getHours() : currentDate.getHours().toString();
  const formatMinutes = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes().toString();
  return formatDate + "/" + formatMonth + "/" + formatFullYear + " AT " + formatHours + ":" + formatMinutes;
}

export const convertTimestamp = (timestamp) => {
  if (!timestamp) return;
  const currentDate = new Date(timestamp);
  const formatDate = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate().toString();
  const formatMonth = currentDate.getMonth() < 10 ? "0" + currentDate.getMonth() : currentDate.getMonth().toString();
  const formatFullYear = currentDate.getFullYear() < 10 ? "0" + currentDate.getFullYear() : currentDate.getFullYear().toString();
  return formatDate + "/" + formatMonth + "/" + formatFullYear;
}