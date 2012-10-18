exports.index = function(req, res) {

    var data = [],
        fs = require('fs'),
        root = './public/videos',
        path = req.params.path || '';

    root += '/' + path;

    console.log('body', req.body);
    console.log('params', req.params);

    fs.readdir(root, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }

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
