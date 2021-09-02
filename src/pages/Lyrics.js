import { useState, useEffect } from "react";
import "./Lyrics.css";

export default function Lyrics() {
  const [lyrics, setLyrics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/api/lyrics?artist=bts&track=butter")
      .then((res) => res.json())
      .then((data) => {
        setLyrics(data);
        setIsLoading(false);
      });
  }, []);

  function renderLyrics() {
    if (isLoading || lyrics === null) {
      return "Loading...";
    }

    const oldText = lyrics.lyrics;
    const newText = oldText.split("\n").map((text) => {
      return (
        <>
          <p>{text}</p>
        </>
      );
    });
    return newText;
  }

  return (
    <>
      <div>{renderLyrics()}</div>
    </>
  );
}
