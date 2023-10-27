import Script from "next/script";
// @ts-ignore lib should fix typings or package.json exports
import * as AlphaTabApi from "@coderline/alphatab/dist/alphaTab.d.ts";
import { useState, useEffect, createContext } from "react";
// https://alphatab.net/docs/reference/api

export const AlphaTabContext = createContext({
  score: { title: "", artist: "" },
  tracklist: null,
  tracks: [],
  activeTrack: null,
  setActiveTrack: () => {},
  apiReady: null,
  apiInstance: null as AlphaTabApi,
  initAlphaTab: (el: HTMLElement) => el,
  events: (event: string, cb: any) => () => ({ event, cb }),
});

const AlphaTabContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState("https://www.alphatab.net/files/canon.gp");
  const [tracks, setTracks] = useState([]);
  const [apiReady, setApiReady] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | undefined>();
  const [apiInstance, setApiInstance] = useState<AlphaTabApi | false>(false);

  useEffect(() => {
    const domReady = !!apiInstance;
    if (domReady) {
      apiInstance.scoreLoaded?.on((score: any) => {
        setTracks(score.tracks);
        setScore(score);
      });
    }
  }, [apiInstance]);

  const initAlphaTab = (el: HTMLElement) => {
    console.log("init");
    if (el && apiReady) {
      const settings = {
        file: "https://www.alphatab.net/files/canon.gp",
        // file: "./radio.xml",
      };
      const alphaTabInstance: AlphaTabApi = new window.alphaTab.AlphaTabApi(el, settings);
      setApiInstance(alphaTabInstance);
      alphaTabInstance.renderStarted.on(() => console.log("started"));
      alphaTabInstance.renderFinished.on(() => console.log("done"));
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
      <AlphaTabContext.Provider value={ctx}>{children}</AlphaTabContext.Provider>
    </>
  );
};

export default AlphaTabContextProvider;
