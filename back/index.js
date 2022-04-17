const fs = require('fs');
const { resolve } = require('path');
const cors = require("cors");
const express = require('express');

const FileManager = require('./utils/fileUtils');
const router = require('./utils/router');
const errorHandler = require('./utils/errorHandler');

const app = express();
const PORT = 4999;

// resolve file directory path
const fileDirectory = resolve(__dirname, '../fileDirectory');

// check if the files directory exists
if (!fs.existsSync(fileDirectory)) {
    throw new Error(`Directory : ${fileDirectory} doesn't exists`);
}

// fileManager instance with the files directory path
const fileManager = new FileManager(fileDirectory);

app.use(cors());
// handlers for post, json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router(fileManager));

// error handler
app.use(errorHandler);

// app init
app.listen(PORT, () => {
    console.log(`File server is listening on port :${PORT}`);
});
