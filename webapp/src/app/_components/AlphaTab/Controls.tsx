import { useContext, useRef } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";
import TrackItem from "./TrackItem";

export default function Controls() {
  const { tracks } = useContext(AlphaTabContext);

  const tracklist = useRef(null);
  return (
    <div className="at-track-list" ref={tracklist}>
      {tracks?.length > 0 && tracks.map((t, key) => <TrackItem id={`t-${key}`} track={t} key={key} />)}
    </div>
  );
}
