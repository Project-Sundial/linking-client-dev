export const addPath = (crontabText) => {
  if (crontabText.startsWith('PATH=/usr/local/bin:')) {
    return crontabText
  } 
  return 'PATH=/usr/local/bin:$PATH\n' + crontabText;
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