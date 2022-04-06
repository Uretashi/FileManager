const fs = require('fs');
const { resolve } = require('path');

const FileManager = require('./utils/fileUtils');
const fileDirectory = resolve(__dirname, '../fileDirectory');

// check if the files directory exists
if (!fs.existsSync(fileDirectory)) {
    throw new Error(`Directory : ${fileDirectory} doesn't exists`);
}

const fileManager = new FileManager(fileDirectory);

//-------- TODO create unitary tests for these lines --------
// create file
fileManager.createInDirectory('new.txt', 'Hello this is a new file !');
// create folder
fileManager.createInDirectory('test1', false);
// create folder in folder
fileManager.createInDirectory('test1/test2', false);
fileManager.createInDirectory('test1/test2/test3', false);

// delete file
fileManager.removeInDirectory('new.txt');

// multiple files for recursive delete
fileManager.createInDirectory('test1/test2/file.txt', 'File in test2');
fileManager.createInDirectory('test1/test2/file2.txt', 'File2 in test2');
fileManager.createInDirectory('test1/test2/file3.txt', 'File3 in test2');

fileManager.createInDirectory('test1/test2/test3/file11.txt', 'File11 in test3');
fileManager.createInDirectory('test1/test2/test3/file22.txt', 'File22 in test3');
fileManager.createInDirectory('test1/test2/test3/file33.txt', 'File33 in test3');

// file movement
fileManager.moveFromTo('test1/test2/test3/file11.txt', 'test1/test2/file11.txt');
// folder movement
fileManager.moveFromTo('test1/test2/test3', 'test1/testNew3', false);

// read files in directory
console.log(fileManager.readDirectory('test1/test2'));

// delete main folder
fileManager.removeInDirectory('test1', false);