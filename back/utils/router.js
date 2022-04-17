const { Router } = require('express');
const { resolve } = require('path');

const executeCommand = require('./executeCommand');
const validatePostParams = require('./middleware');

const appRouter = Router();


// router functions
module.exports = (fileManager) => {
    // read a folder content (root folder by default)
    appRouter.get('/folderContents/:childFolder?', (req, res) => {
        // if childFolder parameter is present, read his contents
        const returnFuncRes = req.params.childFolder ?
            fileManager.readDirectory(req.params.childFolder.split('_').join('/')) :
            fileManager.folderContents;

        res.status(200).json({ message: 'Directory readed successfully !', data: returnFuncRes });
    });
    // read a file content
    appRouter.get('/fileContent/:path', (req, res) => {
        const path = req.params.path.split('_').join('/');
        const fileData = fileManager.readFileContent(path);
        res.status(200).json({ message: 'File readed successfully !', data: fileData });
    });
    // remove a file/folder
    appRouter.get('/remove/:toRemove', (req, res) => {
        // create path from the toRemove parameter
        const createRoute = req.params.toRemove.split('_').join('/');
        // remove the object, while veryfing if it is a file
        fileManager.removeInDirectory(createRoute, createRoute.includes('.'));
        res.status(200).json({ message: `Folder, file ${createRoute} deleted successfully !` });
    });
    // create a file/folder
    appRouter.post('/create', (req, res) => {
        // validate post data
        const data = validatePostParams(req.body, ['objectName', 'data']);
        // add the .txt extension if the new object is a file and doesn't contains any extension
        if (data.data && !/\.([A-Za-z]{1,3})$/.test(data.objectName)) data.objectName = `${data.objectName}.txt`;

        fileManager.createInDirectory(data.objectName, data.data);
        res.status(200).json({ message: `Folder, file ${data.objectName} created successfully !` });
    });
    // move a file/folder to a new path
    appRouter.post('/move', (req, res) => {
        // validate post data
        const data = validatePostParams(req.body, ['objectToMove', 'newPath']);
        // move the object while checking his type
        fileManager.moveFromTo(data.objectToMove, data.newPath, data.objectToMove.includes('.'));
        res.status(200).json({ message: `Folder, file ${data.objectToMove} successfully moved to ${data.newPath} !` });
    });
    // command handler
    appRouter.post('/command', (req, res) => {
        // validate post data
        const data = validatePostParams(req.body, ['command', 'shellPath']);
        executeCommand(data.command, resolve(fileManager.fileDirectory), data.shellPath ? data.shellPath : null).then(output => res.status(200).json({ data: output }));
    });
    return appRouter;
};