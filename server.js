const express = require('express');
const fs = reqire('fs');
const path = require('path');
const PORT = 3001;
const data = require('./db/db.json');

const app = express();

// middleware POG
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// get route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
// get route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// route for database request
app.get('/api/notes', (res, res) => {
    console.log(`${req.method} has been received and being processed`);
    fs.readFile(`./db/db.json`, `utf-8`, (err, data) => err ? console.log(err) : res.json)
})

//---------generates a string of random numbers and letters BELOW-----------
// module.exports = () =>
//   Math.floor((1 + Math.random()) * 0x10000)
//     .toString(16)
//     .substring(1);
// --------------------------------------------------------------------
