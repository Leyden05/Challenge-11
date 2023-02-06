const express = require('express');
const fs = reqire('fs');
const path = require('path');
const PORT = 3001;
const data = require('./db/db.json');
const uuid = require('./helpers/uuid');

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
    console.info(`${req.method} has been received and being processed. bop beep boop.`);
    fs.readFile(`./db/db.json`, `utf-8`, (err, data) => err ? console.log(err) : res.json)
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received. Adding note shortly. beep boop.`)

// now we have to destructure... yay! :/
    const { title, text } = req.body;

    if (title && text) {
        // new note that we shall save into our big box of fun!
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if(err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4),
                (writeErr) =>
                writeErr ? console.error(writeErr) : console.info('Successfully logged note. beep beep boop bop.'));
            };
        });
        
        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error. Beep Boop. No new note available');
    }

});

//---------generates a string of random numbers and letters BELOW-----------
// module.exports = () =>
//   Math.floor((1 + Math.random()) * 0x10000)
//     .toString(16)
//     .substring(1);
// --------------------------------------------------------------------
