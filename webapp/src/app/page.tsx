"use client";
import { useEffect, useRef } from "react";
// import { AlphaTabApi } from "@coderline/alphatab";
import Script from "next/script";

export default function Home() {
  const tab = useRef(null);
  const wrap = useRef(null);
  const handleScriptLoaded = () => {
    if (tab.current) {
      const settings = {
        file: "https://www.alphatab.net/files/canon.gp",
      };
      const alphaTabInstance = new window.alphaTab.AlphaTabApi(tab.current, settings);
      // alphaTabInstance.file = "./radio.xml";
      alphaTabInstance.scoreLoaded?.on(score => console.log("loaded", score));
    }
  };
  useEffect(() => {
    console.log("Well something happened", tab.current);
    tab?.current.addEventListener("alphaTab.scoreLoaded", e => {
      console.log("Score was loaded!", e.detail);
    });
  }, [tab]);
  if (!tab) {
    return <main>...loading</main>;
  }
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
        <div className="at-content">
          <div className="at-sidebar">Tracker</div>
          <div className="at-viewport">
            <div className="at-main" ref={tab}></div>
          </div>
          <div className="at-controls">Controls</div>
        </div>
      </section>
    </main>
  );
}
