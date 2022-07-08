import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./Lyrics.css";
import { ReactComponent as Back } from "../icons/Back.svg";

export default function Lyrics() {
  const [lyrics, setLyrics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = new URLSearchParams(useLocation().search);
  const artist = params.get("artist");
  const track = params.get("track");
  const history = useHistory();
  const base = window.location.origin;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${base}/api/lyrics?artist=${artist}&track=${track}`)
      .then((res) => res.json())
      .then((data) => {
        setLyrics(data);
        setIsLoading(false);
      });
  }, [artist, track, base]);

  function renderLyrics() {
    if (isLoading || lyrics === null) {
      return (
      <>
      "Loading...";
      </>
    )}

    const plainText = lyrics.lyrics;

    const formattedText = plainText.split("\n").map((text) => {
      return <p className="Lyrics__text">{text}</p>;
    });
    return (
      <div className="Lyrics__container">
        <p className="Lyrics__trackName">{track}</p>
        <div className="Border--lyrics"></div>
        {formattedText}
        <button className="Button__back" onClick={() => history.goBack()}>
          <Back className="Button__back--icon" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div>{renderLyrics()}</div>
    </>
  );
}
