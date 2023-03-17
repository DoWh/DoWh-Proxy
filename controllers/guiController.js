module.exports = function (req,res) {
    res.sendFile(__appdir + '/public/index.html')
}

