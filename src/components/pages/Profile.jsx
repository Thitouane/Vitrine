import { useState, useEffect } from "react";
import "../../utils/i18n"; // ✅ Initialisation i18n
import { useTranslation } from 'react-i18next'; // ✅ Import nécessaire

import "../../styles/pages/Profile.css";
import RGBGlitch from "../effects/RGBGlitch";
import ProgressBar from "../effects/ProgressBar";

import profilePic from "../../assets/profile.png";

export default function Profile() {
  const { t } = useTranslation(); // ✅ Hook i18n

    return (
        <section className="about retro-profile">
                <RGBGlitch>
                    {/* Titre */}
                    <h1 className="retro-title no-clip">
                        {t('profile-title')}
                    </h1>
                </RGBGlitch>

                
                <RGBGlitch>
                    {/* Photo */}
                    <div className="profile-pic-area">
                        <span className="profile-pic-wrapper rotating-image">
                            <img src={profilePic} alt="Moi" className="profile-pic" />
                        </span>
                    </div>
                </RGBGlitch>


                <div className="profile-content-area">
                    {/* Left arrow label */}
                    <div className="arrow-left">
                        {t('profile-left-arrow')}
                    </div>

                    {/* Contenu */}
                    <div className="profile-info-menu">
                        <RGBGlitch className="profile-info-row">
                            <span className="profile-label">
                                {t('profile-name')} :
                            </span>
                            <span className="profile-value">Thitouzg</span>
                        </RGBGlitch>

                        <RGBGlitch className="profile-info-row">
                            <span className="profile-label">
                                Niveau{/*t('profile-birthdate')*/} :
                            </span>
                            <span className="profile-value">
                                {new Date().getFullYear() - 1999} 
                            </span>
                        </RGBGlitch>
                        
                        <RGBGlitch className="profile-info-row">
                            <span className="profile-label">
                                Classe {/*t('profile-job')*/} :
                            </span>
                            <span className="profile-value">
                                {t('profile-job-answer')}
                            </span>
                        </RGBGlitch>
                        
                        <RGBGlitch className="profile-info-row">
                            <span className="profile-label">
                            {t('profile-nationality')} :
                            </span>
                            <span className="profile-value">
                            <img
                                src="/images/fr.png"
                                alt="Français"
                                className="profile-value-flag"
                            />
                            </span>
                        </RGBGlitch>

                        <RGBGlitch className="profile-info-row">
                            <span className="profile-label">
                                ATK :
                            </span>
                            <ProgressBar value={10} segments={10} showLabel={true} />
                        </RGBGlitch>

                        <RGBGlitch className="profile-info-row">
                            <span className="profile-label">
                                PSY :
                            </span>
                            <ProgressBar value={10} segments={10} showLabel={true} />
                        </RGBGlitch>

                        <RGBGlitch className="profile-info-row">
                            <span className="profile-label">
                                DEF :
                            </span>
                            <ProgressBar value={10} segments={10} showLabel={true} />
                        </RGBGlitch>

                        <RGBGlitch className="profile-info-row">
                            <span className="profile-label">
                                VIT :
                            </span>
                            <ProgressBar value={10} segments={10} showLabel={true} />
                        </RGBGlitch>

                    </div> 

                    {/* Right arrow label */}
                    <div className="arrow-right">
                        {t('profile-right-arrow')}
                    </div>
                </div>
                
                
        </section>
    );
}

