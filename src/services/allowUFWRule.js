import { exec } from 'child_process';
import { LISTENER_PORT } from '../constants/ports';

export const allowUFWRule = () => {
  const command = `sudo ufw allow from 10.108.0.0/20 to any port ${LISTENER_PORT}`;
  
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
