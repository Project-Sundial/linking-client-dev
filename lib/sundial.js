export { spawn } from 'child_process';
console.log("hello!")
const command1 = (program) => {
  const args = program.args;

  // Join the arguments into a single string
  const commandString = args.join(' ');

  // Execute the command using the shell
  const childProcess = spawn(commandString, {
    shell: true,
    stdio: 'inherit', // To inherit the standard I/O streams
  });

  // Handle errors or completion
  childProcess.on('error', (error) => {
    console.error('Error:', error);
  });

  childProcess.on('exit', (code) => {
    if (code === 0) {
      console.log('Command completed successfully');
    } else {
      console.error(`Command failed with code ${code}`);
    }
  });
};

const command2 = () => {
  // Logic for command2
};

export default {
  command1,
  command2,
};
