import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Lyrics.css";

export default function Lyrics() {
  const [lyrics, setLyrics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = new URLSearchParams(useLocation().search);
  const artist = params.get("artist");
  const track = params.get("track");

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:4000/api/lyrics?artist=${artist}&track=${track}`)
      .then((res) => res.json())
      .then((data) => {
        setLyrics(data);
        setIsLoading(false);
      });
  }, [artist, track]);

  function renderLyrics() {
    if (isLoading || lyrics === null) {
      return "Loading...";
    }
    const plainText = lyrics.lyrics;
    const formattedText = plainText.split("\n").map((text) => {
      return (
        <>
          <p>{text}</p>
        </>
      );
    });
    return formattedText;
  }

  return (
    <>
      <div>{renderLyrics()}</div>
    </>
  );
}
