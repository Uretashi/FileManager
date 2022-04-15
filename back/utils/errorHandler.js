module.exports = (err, req, res, next) => {
    if (err.code === 'ENOENT') err.message = `No such file/directory : ${req.url.split(/[\/_]/).slice(2).join('/')}`;
    if (err.code === 'ENOTDIR') err.message = 'Not such directory';
    if (err.code === 127) err.message = `Command ${err.cmd} is invalid`;

    return res.status(400).json({ errorCode: err.code, message: err.message });
}