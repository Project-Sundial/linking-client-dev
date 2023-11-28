import { exec } from 'child_process';
import { LISTENER_PORT } from '../constants/ports';
import { getHubIpAddress } from './config';

export const allowUFWRule = () => {
  const command = `sudo ufw allow from ${getHubIpAddress()} to any port ${LISTENER_PORT}`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing ufw command:', error);
    }
    if (stderr) {
      console.error('ufw command returned an error:', stderr);
    }
    if (stdout) {
      console.log('ufw command output:', stdout);
    }
  });
}
