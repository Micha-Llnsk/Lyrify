import { useState, useEffect } from "react";

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

    return <p>{lyrics.lyrics}</p>;
  }

  return (
    <>
      <div>{renderLyrics()}</div>
    </>
  );
}
