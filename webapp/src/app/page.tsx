"use client";
import "./page.css";
import AlphaTabContextProvider from "./_store/alphaTab-context";
import Overlay from "./_components/AlphaTab/OverLay";
import TrackList from "./_components/AlphaTab/TrackList";
import ScoreCanvas from "./_components/AlphaTab/ScoreCanvas";

export default function Home() {
  return (
    <main>
      <header>
        <h1>Lady Sunday</h1>
        <small>omdat mijn moeder mij verkeerd verstond...</small>
      </header>
      <AlphaTabContextProvider>
        <section className="at-wrap">
          <Overlay />
          <div className="at-content">
            <div className="at-sidebar">
              {/* <div className="at-sidebar-content"> */}
              <TrackList />
              {/* </div> */}
            </div>
            <div className="at-viewport">
              <ScoreCanvas />
            </div>
          </div>
          <div className="at-controls">Controls</div>
        </section>
      </AlphaTabContextProvider>
    </main>
  );
}
