const fs = require('fs');
const { resolve } = require('path');


/**
 * A File manager class containing methods to interact with a given directory
 * 
 * @property {string} fileDirectory path to the main files directory
 * @method readDirectory : list files/folders present in the given directory
 * @method createInDirectory : create a file/folder in the given directory
 * @method removeInDirectory : delete a file/folder in the given directory
 * @method moveFromTo : move a file/folder from the old to the new destination
 */
class FileManager {
    constructor(fileDirectory) {
        this.fileDirectory = fileDirectory.endsWith('/') ? fileDirectory : fileDirectory + '/';
    }

    /**
     * list the files in a given directory
     * 
     * @param {string} [childDirectory] path to a child directory 
     * @returns {Array<string>} present files/folders
     */
    readDirectory(childDirectory = '') {
        const directory = childDirectory ? this.fileDirectory + childDirectory : this.fileDirectory;
        return fs.readdirSync(directory, 'utf-8');
    }

    /**
     * create a new file or directory in the files folder
     * 
     * @param {string} name name of the new file/folder
     * @param {string} [fileData=null] data of the new file (if file)
     */
    createInDirectory(name, fileData = null) {
        const structuredPath = resolve(this.fileDirectory, name)
        if (fileData) {
            fs.writeFileSync(structuredPath, fileData);
        } else {
            fs.mkdirSync(structuredPath);
        }
    }

    /**
     * remove a file or directory with recursivity for directory
     * 
     * @param {string} name name of the object to be deleted
     * @param {boolean} [isFile=true] is a file (default true)
     */
    removeInDirectory(name, isFile = true) {
        // structured path to the object
        const structuredPath = resolve(this.fileDirectory, name);
        // define the recursivity if the object is a folder
        fs.rmSync(structuredPath, isFile ? {} : { recursive: true, force: true });
    }

    /**
     * move a file/directory to the given path
     * 
     * @param {string} name object to be moved
     * @param {string} newPath the new path of the object
     * @param {boolean} isFile is the object a file
     */
    moveFromTo(name, newPath, isFile = true) {
        // structured path's
        const structuredOldPath = resolve(this.fileDirectory, name);
        const structuredNewPath = resolve(this.fileDirectory, newPath);

        if (isFile) {
            fs.copyFileSync(structuredOldPath, structuredNewPath);
        } else {
            fs.cpSync(structuredOldPath, structuredNewPath, { recursive: true, force: true });
        }

        // remove the copied object
        this.removeInDirectory(structuredOldPath, isFile);
    }
}

module.exports = FileManager;