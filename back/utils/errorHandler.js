module.exports = (err, req, res, next) => {
    console.log(err)

    if (err.code === 'ENOENT') err.message = `No such file/directory : ${req.url.split(/[\/_]/).slice(2).join('/')}`;
    if(err.code === 'ENOTDIR') err.message = 'Not such directory';

    return res.status(400).json({ errorCode: err.code, message: err.message });
}