import { EXECUTABLE_FOLDER_PATH } from "../constants/paths.js";

export const addPath = (crontabText) => {
  if (crontabText.startsWith(`PATH=${EXECUTABLE_FOLDER_PATH}:`)) {
    return crontabText
  }
  return `PATH=${EXECUTABLE_FOLDER_PATH}:$PATH\n\n` + crontabText;
}

export const convertPath = (line) => {
  if (line.startsWith('PATH') && !line.startsWith(`PATH=${EXECUTABLE_FOLDER_PATH}`)) {
    const arr = line.split(' ').join('').split('=');
    arr[1] = `${EXECUTABLE_FOLDER_PATH}:` + arr[1];
    return arr.join('=');
  } else {
    return line;
  }
}