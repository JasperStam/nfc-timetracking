var http = require('http');
var fs = require('fs');

var targetFile = 'index.html';
var port = 3000;
var host = '127.0.0.1';
var tags = [];

var server = http.createServer( function(req, res) {
    if (req.method === 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            parsePost(body);
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(body);
    }
    if (req.method === 'GET') {
        var html = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
});

var parsePost = function (body) {
    var req = JSON.parse(body);
    var source = req.source;
    var action = ' checked ' + req.action;
    var date = new Date().toUTCString();

    var html = '<p>' + source + action + ' at ' + date + '</p>';

    fs.appendFile(targetFile, html + '\n',
        function (e) {
            if (e) console.log('Write error', e);
        }
    );
}


server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
