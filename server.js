// Packages needed for this application
const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static(path.join(__dirname, "public")));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});