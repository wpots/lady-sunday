"use client";
import Script from "next/script";
// @ts-ignore lib should fix typings or package.json exports
import * as AlphaTabApi from "@coderline/alphatab/dist/alphaTab.d.ts";
import { useState, useEffect, createContext } from "react";
// https://alphatab.net/docs/reference/api

export const AlphaTabContext = createContext({
  score: {},
  tracks: [],
  activeTrack: "",
  setActiveTrack: (id: string) => {},
  apiReady: false,
  apiInstance: null as AlphaTabApi,
  initAlphaTab: (el: any) => el,
  events: (event: string, cb: any) => () => ({ event, cb }),
});

const AlphaTabContextProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("AT CTX");
  const [score, setScore] = useState({});
  const [tracks, setTracks] = useState([]);
  const [apiReady, setApiReady] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string>("");
  const [apiInstance, setApiInstance] = useState<any>(false);

  useEffect(() => {
    const domReady = !!apiInstance;
    if (domReady) {
      apiInstance.scoreLoaded?.on((score: any) => {
        setTracks(score.tracks);
        setScore(score);
      });
    }
  });

  const initAlphaTab = (el: HTMLElement) => {
    console.log("init");
    if (el && apiReady) {
      const settings = {
        file: "https://www.alphatab.net/files/canon.gp",
        // file: "./radio.xml",
        player: {
          enablePlayer: true,
          soundFont: "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2",
          scrollElement: el.closest("#scroller"),
        },
      };
      const alphaTabInstance: AlphaTabApi = new window.alphaTab.AlphaTabApi(el, settings);
      setApiInstance(alphaTabInstance);
      alphaTabInstance.renderStarted.on(() => console.log("started"));
      alphaTabInstance.renderFinished.on(() => console.log("done"));
      alphaTabInstance.playerReady.on(() => console.log("player ready"));
    }
  };

  const handleScriptLoaded = () => {
    setApiReady(true);
  };

  const ctx = {
    initAlphaTab,
    apiReady,
    apiInstance,
    score,
    tracks,
    activeTrack,
    setActiveTrack,
    events: (event: string, cb: any) => apiInstance[event as keyof AlphaTabApi].on(cb),
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.min.js"
        onLoad={handleScriptLoaded}
      />
      {/* @ts-ignore */}
      <AlphaTabContext.Provider value={ctx}>{children}</AlphaTabContext.Provider>
    </>
  );
};

export default AlphaTabContextProvider;
