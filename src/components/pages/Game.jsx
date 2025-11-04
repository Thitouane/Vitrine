import { useState, useEffect } from "react";
import "../../utils/i18n"; // ✅ Initialisation i18n
import { useTranslation } from 'react-i18next'; // ✅ Import nécessaire

import game1img1 from "../../assets/game1_1.png";
import game1img2 from "../../assets/game1_2.png";
import game1img3 from "../../assets/game1_3.png";
import game2img1 from "../../assets/game2_1.png";

import GamePage from "../GamePage";

export default function Game() {
  const { t, i18n } = useTranslation(); // ✅ Hook i18n
  const [currentLang, setCurrentLang] = useState(i18n.language);

    return (
        <section>
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
                    <h2>{t('game-title1')}</h2>
                    <span className="profile-label">
                    {t('game-status1')}
                    </span>
                    <p>
                    {t('game-description1')}
                    </p>
                    <a href="https://www.youtube.com/watch?v=hsP46Xhn4TQ&ab_channel=ThitouaneHelle" className="download-btn">Demo</a>
                </div>
            </section>
            
            <section className="game-section reverse">
                <img src={game2img1} alt="Game2-preview" className="game-preview"/>
                <div className="game-info retro-box">
                    <h2>{t('game-title2')}</h2>
                    <span className="profile-label">
                    {t('game-status2')}
                    </span>
                    <p>
                    {t('game-description2')}
                    </p>
                </div>
            </section>

            <section className="secret-game">
                <GamePage />
            </section>
        </section>
    );
}
