var http = require('http'),
    mime = require('mime'),
    path = require('path'),
    fs = require('fs');

// cache file contents
var cache = {};

// Helper functions
function send404(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('Error 404: Resource not found.');
  res.end();
}

function sendFile(res, filePath, fileContents) {
  res.writeHead(200, {
    'Content-Type': mime.lookup(path.basename(filePath)),
  });
  res.end(fileContents);
}

function serveStatic(res, cache, absPath) {
  if (cache[absPath]) {
    sendFile(res, absPath, cache[absPath]);
  }
  else {
    fs.exists(absPath, function (exists) {
      if (exists) {
        fs.readFile(absPath, function (err, data) {
          if (err) {
            send404(res);
          }
          else {
            cache[absPath] = data;
            sendFile(res, absPath, data);
          }
        });
      }
      else {
        send404(res);
      }
    });
  }
}


