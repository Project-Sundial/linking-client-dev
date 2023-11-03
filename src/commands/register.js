import fs from 'fs';
import path from 'path';

export const register = async (args) => {
  if (args.length < 2) {
    console.error('No arguments provided.');
    return;
  }

  if (process.getuid() !== 0) {
    console.error('This command requires administrative (sudo) privileges.\n\n'+
      `Please enter the following command:\n\nsudo sundial register ${args[1]}`);
    return;
  }

  const data = {
    API_KEY: args[1],
  };

  const directoryPath = '/etc/sundial';
  const filePath = path.join(directoryPath, 'config.json');

  const jsonData = JSON.stringify(data, null, 2);

  try {
    if (!fs.existsSync(directoryPath)) {
      // Create the directory if it doesn't exist
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.writeFileSync(filePath, jsonData);
    console.log(`Data has been written to ${filePath}`);
  } catch (err) {
    console.error('Error writing data to the file:', err);
  }
};
