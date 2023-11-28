import { EXECUTABLE_PATH } from "../constants/paths";

export const addPath = (crontabText) => {
  if (crontabText.startsWith(`PATH=${EXECUTABLE_PATH}:`)) {
    return crontabText
  }
  return `PATH=${EXECUTABLE_PATH}:$PATH\n` + crontabText;
}

export const convertPath = (line) => {
  if (line.startsWith('PATH') && !line.startsWith(`PATH=${EXECUTABLE_PATH}`)) {
    const arr = line.split(' ').join('').split('=');
    arr[1] = `${EXECUTABLE_PATH}:` + arr[1];
    return arr.join('=');
  } else {
    return line;
  }
}