const { exec } = require('child_process');


/**
 * execute a terminal command
 * 
 * @param {string} command command to execute
 * @param {string} shellPath change the default shell (CMD for Windows)
 * 
 * @returns {string} output of the command
 */
module.exports = (command, shellPath = null) => {
    exec(command, { shell: shellPath }, (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log(`Output for the command "${command}" :\n${stdout}`);
    });
}