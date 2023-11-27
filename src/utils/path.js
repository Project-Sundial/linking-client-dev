import { EXECUTABLE_PATH } from "../constants/paths";

export const addPath = (crontabText) => {
  if (crontabText.startsWith(`PATH=${EXECUTABLE_PATH}:`)) {
    return crontabText
  } 
  return `PATH=${EXECUTABLE_PATH}:$PATH\n` + crontabText;
}

export const convertPath = (line) => {
  if (line.startsWith('PATH') && !line.startsWith('PATH=/usr/local/bin:')) {
    const arr = line.split(' ').join('').split('=');
    arr[1] = '/usr/local/bin:' + arr[1];
    return arr.join('=');
  } else {
    return line;
  }
}