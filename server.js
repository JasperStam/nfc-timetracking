var http = require('http');
var fs = require('fs');
var _ = require('lodash');
var nfcDbHandle = 'nfc_db.json';
var claimDbHandle = 'claim_db.json';
var tagDbHandle = 'tags_db.json';
var port = 3000;
var host = '127.0.0.1';
var currentId = '';

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

var createFile = function(db) {
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
    var tagDb = parseDb(tagDbHandle);

    nfcDb.push({
        source: request.source,
        action: request.action,
        timestamp: new Date().toISOString(),
    });

    if (request.action === 'in') {
        currentId = request.source;
    }

    if (!getTag(tagDb, request.source)) {
        tagDb.push({
            id: request.source,
            ticket: '',
        });
        console.log('pushing to tagDb');
    }

    fs.writeFile(nfcDbHandle, JSON.stringify(nfcDb, null, 4), function(err) {
        if (err) {
          console.log(err);
        }
    });
    fs.writeFile(tagDbHandle, JSON.stringify(tagDb, null, 4), function(err) {
        if (err) {
          console.log(err);
        }
    });
}

var getTag = function(tagDb, tag) {
    return _.first(_.where(tagDb, {id: tag}));
};

var parseClaimPost = function (request) {
    var claimDb = parseDb(claimDbHandle);
    var tagDb = parseDb(tagDbHandle);

    claimDb.push({
        action: request.action,
        ticket: request.ticket,
        timestamp: new Date().toISOString(),
    });

    var tagIndex = _.findIndex(tagDb, {id: currentId});

    if (tagIndex < 0) {
        console.log('Claim before checking', request.ticket);
    } else {
        tagDb[tagIndex].ticket = request.ticket;
    }

    fs.writeFile(claimDbHandle, JSON.stringify(claimDb, null, 4), function(err) {
        if (err) {
          console.log(err);
        }
    });
    fs.writeFile(tagDbHandle, JSON.stringify(tagDb, null, 4), function(err) {
        if (err) {
          console.log(err);
        }
    });
}

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
