"use client";
import { useState, useRef, useEffect } from "react";
import "./page.css";
import TrackItem from "./_components/TrackItem";

import Script from "next/script";

export default function Home() {
  const tab = useRef(null);
  const wrap = useRef(null);
  const overlay = useRef(null);
  const tracklist = useRef(null);
  const [tracks, setTracks] = useState([]);
  const [activeTrack, setActiveTrack] = useState<string | undefined>();
  const [apiInstance, setApiInstance] = useState<Record<any, any> | false>(false);

  useEffect(() => {
    const domReady = tab?.current && overlay?.current && apiInstance;
    if (domReady) {
      apiInstance.scoreLoaded?.on((score: any) => {
        setTracks(score.tracks);
      });
      apiInstance.renderStarted.on(() => (overlay.current.style.display = "flex"));
      apiInstance.renderFinished.on(() => (overlay.current.style.display = "none"));
    }
  }, [tab, overlay, apiInstance]);

  const handleScriptLoaded = () => {
    if (tab.current) {
      const settings = {
        file: "https://www.alphatab.net/files/canon.gp",
        // file: "./radio.xml",
      };
      const alphaTabInstance = new window.alphaTab.AlphaTabApi(tab.current, settings);
      setApiInstance(alphaTabInstance);
    }
  };

  const handleTrackClicked = (track: any, key?: string) => {
    if (apiInstance) apiInstance.renderTracks([track]);
    setActiveTrack(key);
  };

  return (
    <main>
      <Script
        src="https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.min.js"
        onLoad={handleScriptLoaded}
      />

      <header>
        <h1>Lady Sunday</h1>
        <small>omdat mijn moeder mij verkeerd verstond...</small>
      </header>
      <section className="at-wrap" ref={wrap}>
        <div className="at-overlay" ref={overlay}>
          <div className="at-overlay-content">Music Sheet is loading ....</div>
        </div>
        <div className="at-content">
          {/* <!-- Changed sidebar --> */}
          <div className="at-sidebar">
            <div className="at-sidebar-content">
              <div className="at-track-list" ref={tracklist}>
                {tracks.length > 0 &&
                  tracks.map((t, key) => (
                    <TrackItem
                      id={`t-${key}`}
                      onClick={() => handleTrackClicked(t, `t-${key}`)}
                      activeTrack={activeTrack}
                      track={t}
                      key={key}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="at-viewport">
            <div className="at-main" ref={tab}></div>
          </div>
        </div>
        <div className="at-controls">Controls</div>
      </section>
    </main>
  );
}
