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
import './i18n';
import { useTranslation } from 'react-i18next'; // ✅ Import nécessaire

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
  const [page, setPage] = useState("profile");
  const [pendingPage, setPendingPage] = useState(null);
  const [showNoise, setShowNoise] = useState(false);

  const { t, i18n } = useTranslation(); // ✅ Hook i18n
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
  };

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
        <img src={imageI} alt="i" className="background-image"/>
      </div>
      <div className="content scrollable-content">
        <RGBGlitch>
          {page === "profile" && (
            <section className="about retro-profile">
              <h2 className="retro-title character-select-title no-clip">
                {t('profile-title')} : THITOUZG
              </h2>
              <div className="profile-pic-area">
                <span className="profile-pic-wrapper rotating-image">
                  <img src={profilePic} alt="Moi" className="profile-pic" />
                </span>
              </div>
              <div className="profile-info-menu">
                <div className="profile-info-row">
                  <span className="profile-label">
                    {t('profile-name')} :
                  </span>
                  <span className="profile-value">Thitouane</span>
                </div>
                <div className="profile-info-row">
                  <span className="profile-label">
                    {t('profile-job')} :
                  </span>
                  <span className="profile-value">
                    {t('profile-job-answer')}
                  </span>
                </div>
                <div className="profile-info-row">
                  <span className="profile-label">
                    {t('profile-status')} :
                  </span>
                  <span className="profile-value">
                    {t('profile-status-answer')}
                  </span>
                </div>
              </div>
            </section>
          )}

          {page === "games" && (
            <>
              <section className="game-section">
                <div className="video-wrapper">
                  <iframe
                    width="400"
                    height="225"
                    src="https://www.youtube.com/embed/hsP46Xhn4TQ"
                    title="Escape from the Lab - Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="retro-box">
                  <h2>Escape from the Lab</h2>
                  <p>
                    Platformer 2D roguelite où vous incarnez un petit robot qui
                    tente de fuir son usine dans un monde dystopique.
                  </p>
                  <a href="https://www.youtube.com/watch?v=hsP46Xhn4TQ&ab_channel=ThitouaneHelle" className="download-btn">Demo</a>
                </div>
              </section>
              <section className="game-section reverse">
                <Carousel images={[game2img1, game2img2]} />
                <div className="game-info retro-box">
                  <h2>Escape from the Office (Work In Progress)</h2>
                  <p>
                    Quand le monde autour de vous est en train de pourir, une 
                    seul solution... La fuite !
                  </p>
                </div>
              </section>

              <section className="secret-game">
                <GamePage />
              </section>
            </>
          )}

          {page === "reseaux" && (
            <section className="reseaux-section">
              <div className="reseaux-box">
                <div className="reseaux-list">
                  <a href="https://www.linkedin.com/in/thitouane-h-4a2a32220/" target="_blank" rel="noreferrer">
                    <img src="/images/linkedin.png" alt="LinkedIn" />
                    LinkedIn
                  </a>
                  <a href="https://github.com/Thitouane" target="_blank" rel="noreferrer">
                    <img src="/images/github.png" alt="GitHub" />
                    GitHub
                  </a>
                  <a href="https://thitouzg.itch.io/" target="_blank" rel="noreferrer">
                    <img src="/images/itchio.png" alt="Itch.io" />
                    Itch.io
                  </a>
                  <a href="https://twitter.com/ThitouaneHelle" target="_blank" rel="noreferrer">
                    <img src="/images/twitter.png" alt="Twitter" />
                    Twitter
                  </a>
                </div>
              </div>
            </section>
          )}

        </RGBGlitch>
      </div>

      {/* Footer avec switch de langue */}
      <footer className="footer-controls">
        <div className="footer-content">
          <div className="footer-center">
            <button onClick={() => handlePageChange("profile")} className={page === "profile" ? "active" : ""}>{t('footer-profile')}</button>
            <button onClick={() => handlePageChange("games")} className={page === "games" ? "active" : ""}>{t('footer-games')}</button>
            <button onClick={() => handlePageChange("reseaux")} className={page === "reseaux" ? "active" : ""}>{t('footer-socials')}</button>
          </div>
          <div className="footer-right">
            <img
              src="/images/fr.png"
              alt="Français"
              className={`flag ${currentLang === 'fr' ? 'active' : ''}`}
              onClick={() => changeLanguage('fr')}
            />
            <img
              src="/images/gb.png"
              alt="English"
              className={`flag ${currentLang === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
            />
          </div>
        </div>
      </footer>

      <div className="crt-overlay"></div> 
    </div>
  );
}
