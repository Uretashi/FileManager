const util = require("util");
const { exec, spawn } = require("child_process");
const execPromise = util.promisify(exec);
const path = require("path");


/**
 * execute a terminal command
 * 
 * @param {string} command command to execute
 * @param {string} shellPath change the default shell (CMD for Windows)
 * 
 * @returns {Promise<any>} output of the command
 */
module.exports = async (command, initPath, shellPath = null) => {
    let commandRes;
    let secondCommandChar = '&';
    // if git shell need to be executed, convert parameters to Unix
    if(shellPath && shellPath.toLowerCase().includes('git')) {
        initPath = initPath.split(path.sep).join(path.posix.sep);
        secondCommandChar = '&&';
    }
    // try to execute the command while going to the files directory path
    try {
        commandRes = await execPromise(`cd "${initPath}" ${secondCommandChar} ${command}`, { shell: shellPath });
    } catch(err) {
        commandRes = err;
    }

    return commandRes;
}