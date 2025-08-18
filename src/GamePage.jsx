import React, { useRef, useEffect, useState } from "react";

export default function GamePage() {
  const canvasRef = useRef(null);
  const [gameLoaded, setGameLoaded] = useState(false);

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
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      {/* Bouton TL;DR */}
      <button
        onClick={() => setGameLoaded(true)}
        style={{
          padding: "10px 20px",
          background: "#0f0",
          border: "none",
          borderRadius: "8px",
          color: "black",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        TL;DR
      </button>

      {/* Popup avec le jeu */}
      {gameLoaded && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Bouton Fermer */}
            <button
              onClick={() => setGameLoaded(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#ff4444",
                border: "none",
                borderRadius: "50%",
                color: "white",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            {/* Canvas du jeu */}
            <canvas
              ref={canvasRef}
              style={{
                background: "#222",
                imageRendering: "pixelated",
                border: "2px solid #444",
                display: "block",
                margin: "0 auto",
                maxWidth: "100%",
              }}
            />
            <p style={{ color: "#aaa" }}>Press SPACE to jump</p>
          </div>
        </div>
      )}
    </div>
  );
}
