const  fs = require('fs')
const path = require('path')

module.exports = app => {

  fs.readFile('./db/db.json', 'utf8', (err, data) => {

    if (err) throw err;

    let notes = JSON.parse(data); 

    app.get('/api/notes', function(req, res) {
      res.json(notes)
    })

    app.post('/api/notes', function(req, res) {
      let newNote = req.body;
      notes.push(newNote);
      updateDb()
      return console.log('Added new note: ' +newNote.title)
    })

    app.get('/notes', function(req,res) {
      res.sendFile(path.join(__dirname, '../public/notes.html'))
    })

    app.get('*', function(req,res) {
      res.sendFile(path.join(__dirname, '../public/index.html'))
    })
    function updateDb() {
      fs.writeFile('db/db.json', JSON.stringify(notes), err => {
        if (err) throw err;
        return true;
      })
    }
  });
}

  

