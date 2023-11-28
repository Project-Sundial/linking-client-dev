import { exec } from 'child_process';

export const replaceSystemdService = async(serviceName, binaryPath) => {
  try {
    // Stop the existing service if it's running and disable it
    await exec(`sudo systemctl stop ${serviceName}`);
    await exec(`sudo systemctl disable ${serviceName}`);

    // Define the systemd unit file content for the new service
    const unitFileContent = generateUnitFile(serviceName, binaryPath);
    const unitFilePath = `/etc/systemd/system/${serviceName}.service`;

    // Write the unit file content to the systemd unit file
    await exec(`echo '${unitFileContent}' | sudo tee ${unitFilePath}`);
    await exec('sudo systemctl daemon-reload');
    await exec(`sudo systemctl enable ${serviceName}`);
    await exec(`sudo systemctl start ${serviceName}`);
    console.log(`Service '${serviceName}' has been replaced, created, enabled, and started.`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const generateUnitFile = (serviceName, binaryPath) => {
  const username = process.env.SUDO_USER;

  return `[Unit]
  Description=${serviceName}

  [Service]
  ExecStart=${binaryPath}
  Restart=always
  User=${username}

  [Install]
  WantedBy=multi-user.target`;
};