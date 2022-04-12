const { Router } = require('express');
const validatePostParams = require('./middleware');

const appRouter = Router();


module.exports = (fileManager) => {
    appRouter.get('/folderRootData/:childFolder?', (req, res) => {
        const createChildRoute = req.params.childFolder ? req.params.childFolder.split('_').join('/') : null;
        res.status(200).send(fileManager.readDirectory(createChildRoute));
    });
    appRouter.get('/folderContents', (req, res) => {
        res.status(200).send(fileManager.folderContents);
    });
    appRouter.get('/remove/:toRemove', (req, res) => {
        const createRoute = req.params.toRemove.split('_').join('/');
        fileManager.removeInDirectory(createRoute, createRoute.includes('.'));
        res.status(200).json({ message: `Folder, file ${createRoute} deleted successfully !` });
    });
    appRouter.post('/create', (req, res) => {
        const data = validatePostParams(req.body, ['objectName', 'data']);
        if (data && !/.[A-Za-z]{1, 3}}$/.test(data.objectName)) data.objectName = `${data.objectName}.txt`;

        fileManager.createInDirectory(data.objectName, data.data);
        res.status(200).json({ message: `Folder, file ${data.objectName} created successfully !` });
    });
    appRouter.post('/move', (req, res) => {
        const data = validatePostParams(req.body, ['objectToMove', 'newPath']);
        fileManager.moveFromTo(data.objectToMove, data.newPath, data.objectToMove.includes('.'));
        res.status(200).json({ message: `Folder, file ${data.objectToMove} successfully moved to ${data.newPath} !` });
    });

    return appRouter;
};