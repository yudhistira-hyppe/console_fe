const { createServer } = require('https');
const { parse } = require('url');
const { readFileSync } = require('fs');
const next = require('next');

const port = 3500;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '.' });
const handle = app.getRequestHandler();

const httpsOptions = {
  // key: readFileSync('D:/MyWork/Hyppe/Source/SSL/projectcom/server.key'),
  // cert: readFileSync('D:/MyWork/Hyppe/Source/SSL/projectcom/server.crt'),
  key: readFileSync('C:/SSL/new/certificate.key'),
  cert: readFileSync('C:/SSL/new/sslaja.crt'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://project.com:${port}`);
  });
});
