const { createServer } = require('https');
const { parse } = require('url');
const { readFileSync } = require('fs');
const next = require('next');

const port = 3500;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '.' });
const handle = app.getRequestHandler();

const httpsOptions = {
  // change here to ur path file location
  key: readFileSync('/Users/egyfazri/Documents/project/HYYPE/SSL/certificate.key'),
  cert: readFileSync('/Users/egyfazri/Documents/project/HYYPE/SSL/sslaja.crt'),
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
