const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json');
// const uuid = require('./uuid/uuid');

// middleware POG
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// get route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
// get route for notes.html

// route for database request
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} has been received and being processed. bop beep boop.`);
    fs.readFile(`./db/db.json`, `utf-8`, (err, data) => err ? console.log(err) : res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received. Adding note shortly. beep boop.`)

// now we have to destructure... yay! :/
    const { title, text } = req.body;
    console.log(req.body);

    if(title && text) {
        // new note that we shall save into our big box of fun!
        const newNote = {
            title,
            text,
            id: Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1),
        };

        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if(err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4),
                (writeErr) =>
                writeErr ? console.error(writeErr) : res.json(parsedNotes))
            };
        });
        
    //     const response = {
    //         status: 'success',
    //         body: newNote,
    //     };
    //     console.log(response);
    //     res.status(201).json(response);
    // } else {
    //     res.status(500).json('Error. Beep Boop. No new note available');
    }

});

// delete data functionality yay!! boop beep bop on bop
app.delete('/api/notes/:note_id', (req, res) => {
    console.log(req.params.note_id);
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const newerNote = JSON.parse(data)
            const newData = newerNote.filter(obj => obj.id !== req.params.note_id)
            fs.writeFile('./db/db.json', JSON.stringify(newData, null, 4), (err) => err ? console.log(err) : res.json(newData))
        }
    })
});
// html route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// get route pog
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
)


app.listen(PORT, () =>
  console.log(`http://localhost:${PORT} `)
);

//---------generates a string of random numbers and letters BELOW-----------
// module.exports = () =>
//   Math.floor((1 + Math.random()) * 0x10000)
//     .toString(16)
//     .substring(1);
// --------------------------------------------------------------------
