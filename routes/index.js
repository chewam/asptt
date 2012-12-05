var formatNumber = function(number, decimals, dec_point, thousands_sep) {
    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d = dec_point === undefined ? "," : dec_point;
    var t = thousands_sep === undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
 
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var formatFileSize = function(filesize) {
    if (filesize >= 1073741824) {
         filesize = formatNumber(filesize / 1073741824, 2, '.', '') + ' Gb';
    } else {
        if (filesize >= 1048576) {
            filesize = formatNumber(filesize / 1048576, 2, '.', '') + ' Mb';
        } else {
            if (filesize >= 1024) {
                filesize = formatNumber(filesize / 1024, 0) + ' Kb';
            } else {
                filesize = formatNumber(filesize, 0) + ' bytes';
            }
        }
    }
    return filesize;
};

exports.index = function(req, res) {

    var info, stats, data = [],
        fs = require('fs'),
        util = require('util'),
        cfg = require('../config'),
        root = cfg.path,
        path = req.params.path || '';

    root += '/' + path;

    if (path.length) path += '/';

    console.log('root', root);
    console.log('path', path);

    fs.readdir(root, function (err, files) {
        if (err) {
            console.log(err);
            res.status(404);

            res.render('404', {
                title: cfg.name + ' VIDEOS'
            });
            return;
        }

        files.sort();

        files.forEach(function(file) {
            stats = fs.statSync(root + '/' + file);
            data.push({
                name: file,
                path: path + file,
                pathWebm: (path + file).split('MP4')[0] + 'webm',
                size: formatFileSize(stats.size),
                isDirectory: stats.isDirectory()
            });
        });

        res.render('index', {
            title: cfg.name + ' VIDEOS',
            data: data
        });
    });

};

exports.download = function(req, res) {

    var cfg = require('../config'),
        root = cfg.path,
        path = req.params.path || '',
        file = root + '/' + path;

    console.log('download', file);

    // var file = __dirname + '/upload-folder/dramaticpenguin.MOV';

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);

    filestream.on('data', function(chunk) {
        res.write(chunk);
    });

    filestream.on('end', function() {
        res.end();
    });

};

