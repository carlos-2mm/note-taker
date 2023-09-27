const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");

// File utility functions
const { readFromFile, readAndAppend, readAndDelete } = require("../helpers/fsUtils");

// GET route to fetch all notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// GET route to fetch a specific note by ID
notes.get("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});

// POST route to create a new note
notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
      const newNote = {
          title,
          text,
          id: uuidv4(),
      };
      readAndAppend(newNote, "./db/db.json");
      // After appending the new note, send back the updated list
      readFromFile("./db/db.json")
          .then(data => res.json(JSON.parse(data)))
          .catch(err => res.status(500).json({ error: 'Failed to fetch updated notes' }));
  } else {
      res.status(400).json({ error: "Error in adding note" });
  }
});


// DELETE route to remove a note by ID
notes.delete("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readAndDelete(noteId, "./db/db.json");
  // After deleting the note, send back the updated list
  readFromFile("./db/db.json")
      .then(data => res.json(JSON.parse(data)))
      .catch(err => res.status(500).json({ error: 'Failed to fetch updated notes' }));
});


module.exports = notes;
