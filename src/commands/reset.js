import { exec } from 'child_process';

export const reset = () => {
  async function removeSystemdService(serviceName) {
    try {
      await exec(`sudo systemctl stop ${serviceName}`);
      await exec(`sudo systemctl disable ${serviceName}`);
      await exec(`sudo rm /etc/systemd/system/${serviceName}.service`);
      await exec('sudo systemctl daemon-reload');

      console.log(`Service '${serviceName}' has been stopped, disabled, and the unit file has been deleted.`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
  removeSystemdService('sundial-listen');
};
