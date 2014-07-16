
// Helper functions
function send404(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('Error 404: Resource not found.');
  res.end();
}

