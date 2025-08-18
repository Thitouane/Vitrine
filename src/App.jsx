import React, { useState, useEffect } from "react";
import "./App.css";
import GamePage from "./GamePage";
import profilePic from "./assets/profile.png";
import game1img1 from "./assets/game1_1.png";
import game1img2 from "./assets/game1_2.png";
import game1img3 from "./assets/game1_3.png";
import game2img1 from "./assets/game2_1.png";
import game2img2 from "./assets/game2_2.png";
import RGBGlitch from "./RGBGlitch";
import imageI from "./assets/i.png"
import TVStartup from "./TVStartup";
import TVNoiseTransition from "./TVNoiseTransition";

function Carousel({ images }) {
  return (
    <div className="carousel">
      <div className="carousel-track">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Slide ${i}`} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [showStartup, setShowStartup] = useState(true);
  const [page, setPage] = useState("menu");
  const [pendingPage, setPendingPage] = useState(null);
  const [showNoise, setShowNoise] = useState(false);

  // Fonction pour changer de page avec effet grésillement
  const handlePageChange = (nextPage) => {
    if (page === nextPage) return;
    setPendingPage(nextPage);
    setShowNoise(true);
  };

  // Quand l'effet bruit finit, on change la page
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
    <div className="site-container">
      {showNoise && <TVNoiseTransition onEnd={() => setShowNoise(false)} />}
      <div className="background-wrapper">
        <img src={imageI} alt="i" className="background-image"/>
      </div>
      <div className="content">
        <RGBGlitch>
          {/* Affiche la section About uniquement sur le menu */}
          {page === "menu" && (
            <section className="about">
              <img src={profilePic} alt="Moi" className="profile-pic rotating-image" />
              <div>
                <h1>Thitouane – Développeur</h1>
                <p>W.I.P.</p>
                <div className="socials">
                  <a href="https://www.linkedin.com/in/thitouane-h-4a2a32220/" target="_blank" rel="noreferrer">LinkedIn</a>
                  <a href="https://github.com/Thitouane" target="_blank" rel="noreferrer">GitHub</a>
                  <a href="https://thitouzg.itch.io/" target="_blank" rel="noreferrer">Itch.io</a>
                  <a href="https://thitouzg.itch.io/" target="_blank" rel="noreferrer">Twitter</a>
                </div>
              </div>
            </section>
          )}

          {/* Affiche les jeux uniquement sur la page games */}
          {page === "games" && (
            <>
              <section className="game-section">
                <Carousel images={[game1img3, game1img1, game1img2]} />
                <div className="game-info">
                  <h2>Escape from the Lab</h2>
                  <p>
                    Platformer 2D roguelite où vous incarnez un petit robot qui
                    tente de fuir son usine dans un monde dystopique.
                    Avec des niveaux générés aléatoirement et un pool d'objet 
                    renouvellant votre experience de jeu à chaque partie.
                  </p>
                  <a href="https://www.youtube.com/watch?v=hsP46Xhn4TQ&ab_channel=ThitouaneHelle" className="download-btn">Démo</a>
                </div>
              </section>
              <section className="game-section reverse">
                <Carousel images={[game2img1, game2img2]} />
                <div className="game-info">
                  <h2>Escape from the Office (Work In Progress)</h2>
                  <p>
                    Quand le monde autour de vous est en train de pourir, une 
                    seul solution... La fuite ! Essayez de vous évader de votre
                    bureau ne sera pas si facile quand la pourriture atteint même 
                    vos collègues et probablement vous. Jeu Horreur avec un aspect
                    roguelite, dans votre bureau qui sera généré aléatoirement.
                  </p>
                </div>
              </section>

              <section className="secret-game">
                <GamePage />
              </section>
            </>
          )}
        </RGBGlitch>

        {/* Menu principal sous la section About */}
        {page === "menu" && (
          <div className="main-menu">
          </div>
        )}

        {/* Réseaux sociaux */}
        {page === "reseaux" && (
          <div className="reseaux-section">
            <button className="back-btn" onClick={() => setPage("menu")}>&larr; Retour</button>
            <div className="socials" style={{marginTop: 40, fontSize: "1.5rem"}}>
              <a href="https://www.linkedin.com/in/thitouane-h-4a2a32220/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/Thitouane" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://thitouzg.itch.io/" target="_blank" rel="noreferrer">Itch.io</a>
              <a href="https://thitouzg.itch.io/" target="_blank" rel="noreferrer">Twitter</a>
            </div>
          </div>
        )}
      </div>
      <footer className="footer-controls">
        <button onClick={() => handlePageChange("menu")} className={page === "menu" ? "active" : ""}>Menu</button>
        <button onClick={() => handlePageChange("games")} className={page === "games" ? "active" : ""}>Game</button>
        <button onClick={() => handlePageChange("reseaux")} className={page === "reseaux" ? "active" : ""}>Réseau</button>
      </footer>
      <div className="crt-overlay"></div> 
    </div>
  );
}