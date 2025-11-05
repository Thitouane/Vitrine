import { useState, useEffect } from "react";
import "./App.css";

import imageI from "./assets/i.png"

import TVStartup from "./components/effects/TvStartup";
import TVNoiseTransition from "./components/effects/TvNoiseTransition";

import Profile from "./components/pages/Profile";
import Game from "./components/pages/Game";
import Socials from "./components/pages/Socials";
import Footer from "./components/Footer";

export default function App() {
  const [showStartup, setShowStartup] = useState(true);
  const [pendingPage, setPendingPage] = useState(null);
  const [showNoise, setShowNoise] = useState(false);
  const [page, setPage] = useState("profile");
  
  const handlePageChange = (nextPage) => {
      if (page === nextPage) return;
      setPendingPage(nextPage);
      setShowNoise(true);
  };

  useEffect(() => {
    if (!showNoise && pendingPage) {
      setPage(pendingPage);
      setPendingPage(null);
    }
  }, [showNoise, pendingPage]);

  if (showStartup) {
    return <TVStartup onEnd={() => setShowStartup(false)} />;
  }

  return (
    <div className="site-container site-wrapper">
      {showNoise && <TVNoiseTransition onEnd={() => setShowNoise(false)} />}
      
      <div className="background-wrapper">
        {/*<img src={imageI} alt="i" className="background-image"/>*/}
        <div className="moving-background"></div>
      </div>

      <div className="content scrollable-content">
          {page === "profile" && (
            <Profile />
          )}

          {page === "games" && (
            <Game />
          )}

          {page === "reseaux" && (
            <Socials />
          )}
      </div>

      <Footer page={page} handlePageChange={handlePageChange} />

      <div className="crt-overlay"></div> 
    </div>
  );
}
