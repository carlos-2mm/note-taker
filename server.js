// Required modules
const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog");
const api = require("./routes/index.js");

// Set up the server port
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware for logging and parsing
app.use(clog); // Logs request details
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api); // Use API routes from the routes folder
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Default route (catch all)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
