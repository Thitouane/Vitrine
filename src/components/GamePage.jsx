import React, { useRef, useEffect, useState } from "react";

import "../styles/GamePage.css";

export default function GamePage() {
  const canvasRef = useRef(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détection mobile simple
    const checkMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  useEffect(() => {
    if (gameLoaded) {
      const script = document.createElement("script");
      script.src = "/escapevent/RobotInTheVent.js";
      script.onload = () => {
        if (window.startRobotInTheVent) {
          window.startRobotInTheVent(canvasRef.current);
        }
      };
      document.body.appendChild(script);
    }
  }, [gameLoaded]);

  return (
    <div className="secret-game">
      {/* Bouton TL;DR */}
      <button
        onClick={() => setGameLoaded(true)}
        className="tldr-button"
      >
        TL;DR
      </button>

      {/* Popup avec le jeu */}
      {gameLoaded && (
        <div className="pop-up-canvas">
          <div
            className="game-container"
          >
            {/* Bouton Fermer */}
            <button
              onClick={() => setGameLoaded(false)}
              className="close-button"
            >x</button>

            {/* Canvas du jeu */}
            <canvas
              ref={canvasRef}
              className="game-canvas"
            />
            <p className="jump-text">
              {isMobile ? "Press to jump" : "Press SPACE to jump"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
