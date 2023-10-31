"use client";
import Script from "next/script";
// @ts-ignore lib should fix typings or package.json exports
import * as AlphaTabApi from "@coderline/alphatab/dist/alphaTab.d.ts";
import { useState, useEffect, createContext, useCallback } from "react";
// https://alphatab.net/docs/reference/api
interface IScore {
  tracks?: any[];
}

export const AlphaTabContext = createContext({
  score: {} as IScore,
  tracks: [],
  activeTrack: "",
  setActiveTrack: (id: string) => {},

  apiInstance: {} as AlphaTabApi,
  initAlphaTab: (el: HTMLElement): void => undefined,
  events: (event: string, cb: any) => () => ({ event, cb }),
});

const AlphaTabContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState<IScore>({});
  const [tracks, setTracks] = useState([]);
  const [apiReady, setApiReady] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string>("");
  const [apiInstance, setApiInstance] = useState<any>(false);

  if (apiInstance) {
    apiInstance.scoreLoaded?.on((score: any) => {
      setTracks(score.tracks);
      setScore(score);
    });

    // apiInstance.noteMouseUp?.on((note: any) => {
    //   apiInstance.playNote(note);
    // });
  }

  const initAlphaTab = useCallback(
    (el: HTMLElement) => {
      if (apiReady) {
        const settings = {
          // file: "https://www.alphatab.net/files/canon.gp",
          file: "./maria.gp5",
          core: {
            // includeNoteBounds: true,
          },
          notation: {
            elements: {
              ChordDiagrams: false,
            },
          },
          player: {
            enablePlayer: true,
            soundFont: "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2",
            scrollElement: el.closest("#scroller"),
          },
        };
        const alphaTabInstance: AlphaTabApi = new window.alphaTab.AlphaTabApi(el, settings);
        setApiInstance(alphaTabInstance);
      }
    },
    [apiReady]
  );

  const handleScriptLoaded = () => {
    setApiReady(true);
  };

  const ctx = {
    initAlphaTab,
    apiInstance,
    score,
    tracks,
    activeTrack,
    setActiveTrack,
    events: (event: string, cb: any) => apiInstance[event as keyof AlphaTabApi].on(e => cb(e)),
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
