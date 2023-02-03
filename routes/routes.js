const  fs = require('fs')
const path = require('path')

module.exports = app => {

  fs.readFile('./db/db.json', 'utf8', (err, data) => {

    if (err) throw err;

    let notes = JSON.parse(data); 

    app.get("/api/notes", function(req, res) {
      res.json(notes);
  });

    app.post('/api/notes', function(req, res) {
      let newNote = req.body;
      notes.push(newNote);
      updateDb()
      res.json(newNote);
      return console.log('Added new note: ' +newNote.title)
    })
    app.get('/api/notes:id', function(req, res) {
      res.json(notes[req.params.id])
    })

    app.get('/notes', function(req,res) {
      res.sendFile(path.join(__dirname, '../public/notes.html'))
    })

    app.get('*', function(req,res) {
      res.sendFile(path.join(__dirname, '../public/index.html'))
    })

    app.delete('/api/notes/:id', function(req, res) {
      let id = req.params.id;
      notes.splice(id, 1);
      updateDb()
      console.log(`Deleted note with id: ${id}` );
      res.json(notes);
    })

    function updateDb() {
      fs.writeFileSync('db/db.json', JSON.stringify(notes, '\t'), err => {
        if (err) throw err;
        return true;
      })
    }
  });
}

  

