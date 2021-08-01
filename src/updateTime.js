function getCurrentTime(currentDate) {
  let utc_offset = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() + utc_offset);
  const seconds = Date.parse(currentDate) / 1000;
  return seconds;
}

function formatTime(elem) {
  let str = elem.toLocaleTimeString("en-US");
  let start = str.lastIndexOf(":");
  let newElem = str.substr(0, start) + str.substr(start + 3);
  return newElem;
}

export { getCurrentTime, formatTime };