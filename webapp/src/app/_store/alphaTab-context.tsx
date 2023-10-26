import Script from "next/script";

import { useState, useEffect, createContext } from "react";

export const AlphaTabContext = createContext({
  tracklist: null,
  tracks: [],
  activeTrack: null,
  setActiveTrack: () => {},
  apiReady: null,
  apiInstance: null,
  initAlphaTab: (el: HTMLElement) => el,
  events: (event: string, cb: any) => () => ({ event, cb }),
});

const AlphaTabContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tracks, setTracks] = useState([]);
  const [apiReady, setApiReady] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | undefined>();
  const [apiInstance, setApiInstance] = useState<Record<any, any> | false>(false);

  useEffect(() => {
    const domReady = !!apiInstance;
    if (domReady) {
      apiInstance.scoreLoaded?.on((score: any) => {
        setTracks(score.tracks);
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
      const alphaTabInstance = new window.alphaTab.AlphaTabApi(el, settings);
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
    tracks,
    activeTrack,
    setActiveTrack,
    events: (event: string, cb: any) => apiInstance[event].on(cb),
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
