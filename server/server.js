const express = require("express");
const lyricsFinder = require("lyrics-finder");

const app = express();

app.use(express.json());

app.get("/api/lyrics", async (req, res) => {
  const artist = req.query.artist;
  const track = req.query.track;

  const lyrics = (await lyricsFinder(artist, track)) || "No Lyrics Found";
  res.json({ lyrics });
});

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
