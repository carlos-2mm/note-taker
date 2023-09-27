const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  readAndDelete,
} = require("../helpers/fsUtils");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

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

notes.post("/", (req, res) => {
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, "./db/db.json");
      res.json(`Note added successfully 👌🏻`);
    } else {
      res.status(400).json({ error: "Error in adding note" });
    }
  });

notes.delete("/:note_id", (req, res) => {
    const noteId = req.params.note_id;
  
    readAndDelete(noteId, "./db/db.json");
  
    const response = {
      status: "Note deleted successfully",
      body: noteId,
    };
    res.json(response);
  });

module.exports = notes;
