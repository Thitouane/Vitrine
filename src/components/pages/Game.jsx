import { useState, useEffect } from "react";
import "../../utils/i18n"; // ✅ Initialisation i18n
import { useTranslation } from 'react-i18next'; // ✅ Import nécessaire

import game1img1 from "../../assets/game1_1.png";
import game1img2 from "../../assets/game1_2.png";
import game1img3 from "../../assets/game1_3.png";
import game2img1 from "../../assets/game2_1.png";

import RGBGlitch from "../effects/RGBGlitch";
import GamePage from "../GamePage";

import "../../styles/pages/Game.css";

export default function Game() {
  const { t } = useTranslation();
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  

    return (
        <section>
            {/* --- GAME 1 --- */}
            <section className="game-section">
                {!expanded1 ? (
                    <RGBGlitch className="expand-btn-container">
                        <h3> {t("game-other")} </h3>
                        <button className="expand-btn" onClick={() => setExpanded1(true)}>
                             {t("game-expand")}
                        </button>
                    </RGBGlitch>
                ) : (
                    <div>
                        <RGBGlitch className="fade-in game-title">
                            <h2>{t('game-title1')}</h2>
                        </RGBGlitch>

                        <div className="fade-in">
                            <RGBGlitch className="video-wrapper">
                                <iframe
                                src="https://www.youtube-nocookie.com/embed/hsP46Xhn4TQ?modestbranding=1&rel=0&controls=1"
                                title="Escape from the Lab - Demo"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                ></iframe>
                            </RGBGlitch>
                            
                            <RGBGlitch className="retro-box">
                                <span> {t('game-status1')} </span>
                                <div className="tech-list">
                                    <p>{t("game-tech")}</p>
                                    <ul>
                                        <li>Dev : <span className="tech-content">Godot .NET</span></li>
                                        <li>Textures : <span className="tech-content">Krita</span></li>
                                    </ul>
                                </div>
                                <div className="tech-list">
                                    <p>{t("game-type")} <span className="tech-content">{t('game-type1')}</span></p> 
                                </div>
                                <div className="download-btn-container">
                                    <a 
                                    href="https://www.youtube.com/watch?v=hsP46Xhn4TQ&ab_channel=ThitouaneHelle" 
                                    className="download-btn"
                                    >
                                        Demo
                                    </a>
                                </div>
                            </RGBGlitch>
                        </div>


                        <RGBGlitch className=" fade-in">
                            <p> {t('game-description1')} </p>
                        </RGBGlitch>

                        <RGBGlitch className="retract-btn-container">
                            <button
                                className="retract-btn"
                                onClick={() => setExpanded1(false)}
                            > {t("game-retract")} </button>
                        </RGBGlitch>
                    </div>
                )}
            </section>
            
            <section className="game-section normal">
                <div>
                    <RGBGlitch className="game-title">
                        <h2>{t('game-title2')}</h2>
                    </RGBGlitch>
                    <div className="row">
                        <RGBGlitch className="game-info retro-box">
                            <span>
                            {t('game-status2')}
                            </span>
                            <div className="tech-list">
                                <p>{t("game-tech")}</p>
                                <ul>
                                    <li>Dev : <span className="tech-content">Godot .NET</span></li>
                                    <li>3D : <span className="tech-content">Blender</span> </li>
                                    <li>Textures : <span className="tech-content">Krita</span> </li>
                                </ul>
                            </div>
                            <div className="tech-list">
                                <p>{t("game-type")} <span className="tech-content">{t('game-type2')}</span></p> 
                            </div>
                        </RGBGlitch>
                        <RGBGlitch className="game-preview">
                            <img src={game2img1} alt="Game2-preview" className="game-img"/>
                        </RGBGlitch>
                    </div>
                    <RGBGlitch className="row">
                        <p>
                            {t('game-description2')}
                        </p>
                    </RGBGlitch>
                </div>
            </section>

            <section className="secret-game">
                <GamePage />
            </section>
        </section>
    );
}
