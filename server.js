const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const app = express();

function redirectUnmatched(req, res) {
    res.sendfile(path.join(__dirname, 'dist/index.html'))
}

app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(redirectUnmatched);
const port = process.env.PORT || 3000;
app.listen(port);