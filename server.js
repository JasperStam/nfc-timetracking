var http = require('http');
var fs = require('fs');
// var targetFile = 'index.html';
var nfcDbHandle = 'nfc_db.json';
var claimDbHandle = 'claim_db.json';
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
            route(body);
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

function createFile(db) {
    var contents = '[]';
    fs.writeFile(db, contents, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

var parseDb = function(dbHandle) {
    try {
        var file = fs.readFileSync(dbHandle, 'utf8');

        return JSON.parse(file);
    } catch (e) {
        console.log(dbHandle + 'not found, creating the file...');
        createFile(dbHandle);

        return [];
    }
};

var route = function(body) {
    var req = JSON.parse(body);

    if (['in', 'out'].indexOf(req.action) > -1) {
        parseNfcPost(req);
        return;
    }

    if (req.action === 'claim') {
        parseClaimPost(req);
        return;
    }
};

var parseNfcPost = function (request) {
    var nfcDb = parseDb(nfcDbHandle);
    nfcDb.push({
        source: request.source,
        action: request.action,
        timestamp: new Date().toISOString(),
    });

    fs.writeFile(nfcDbHandle, JSON.stringify(nfcDb, null, 4), function(err) {
        if (err) {
          console.log(err);
        }
    });
}

var parseClaimPost = function (request) {
    var claimDb = parseDb(claimDbHandle);
    claimDb.push({
        action: request.action,
        ticket: request.ticket,
        timestamp: new Date().toISOString(),
    });

    fs.writeFile(claimDbHandle, JSON.stringify(claimDb, null, 4), function(err) {
        if (err) {
          console.log(err);
        }
    });
}

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
