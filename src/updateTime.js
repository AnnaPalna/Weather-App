function getCurrentTime(currentDate) {
  let utc_offset = currentDate.getTimezoneOffset();
  //время в utc
  currentDate.setMinutes(currentDate.getMinutes() + utc_offset);
  //перевод текущего времени utc в секунды
  const seconds = Date.parse(currentDate) / 1000;
  //расчет текущего времени utc (+0) во время в выбранном городе(+timezone)
  return seconds;
}

function formatTime(elem) {
  let str = elem.toLocaleTimeString("en-US");
  //delete seconds
  let start = str.lastIndexOf(":");
  let newElem = str.substr(0, start) + str.substr(start + 3);
  return newElem;
}

export { getCurrentTime, formatTime };