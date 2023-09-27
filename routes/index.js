const express = require('express');

// Import notes router
const notesRouter = require('./notes');

const app = express();

// Use notes router for /notes path
app.use('/notes', notesRouter);

module.exports = app;
