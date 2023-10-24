export const addPath = (crontabText) => {
  if (crontabText.startsWith('PATH=/usr/local/bin:')) {
    return crontabText
  } 
  return 'PATH=/usr/local/bin:$PATH\n' + crontabText;
}