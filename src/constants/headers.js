import fs from 'fs';

const configFilePath = '/etc/sundial/config.json';

let apiKey = '';

try {
  const configFileContents = fs.readFileSync(configFilePath, 'utf8');
  const config = JSON.parse(configFileContents);
  apiKey = config.API_KEY;
} catch (error) {
  console.error('Error reading or parsing the configuration file:', error);
  console.error('Register API key with sundial register before attempting other commands');
}

export const HEADERS = {
  headers: {
    'X-Sync-Mode': 'CLI',
    'Authorization': `Basic ${btoa(apiKey)}`,
  },
};