exports.index = function(req, res) {

    var data = [],
        fs = require('fs'),
        cfg = require('../config'),
        root = cfg.path,
        path = req.params.path || '';

    root += '/' + path;

    fs.readdir(root, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }

        files.sort();

        files.forEach(function(file) {
            data.push({
                name: file,
                path: path + '/' + file,
                isDirectory: fs.statSync(root + '/' + file).isDirectory()
            });
        });

        res.render('index', {
            title: 'ASPTT VIDEOS',
            data: data
        });
    });

};
