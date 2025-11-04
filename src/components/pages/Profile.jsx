import { useState, useEffect } from "react";
import "../../utils/i18n"; // ✅ Initialisation i18n
import { useTranslation } from 'react-i18next'; // ✅ Import nécessaire

import profilePic from "../../assets/profile.png";

export default function Profile() {
  const { t, i18n } = useTranslation(); // ✅ Hook i18n
  const [currentLang, setCurrentLang] = useState(i18n.language);

    return (
        <section className="about retro-profile">
            <div>
                {t('profile-left-arrow')}
            </div>

            <h2 className="retro-title character-select-title no-clip">
                {t('profile-title')}
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
                    {t('profile-birthdate')} :
                    </span>
                    <span className="profile-value">1999</span>
                </div>
                <div className="profile-info-row">
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
                    {t('profile-hobby')} :
                    </span>
                    <span className="profile-value">
                    {t('profile-hobby-answer')}
                    </span>
                </div>
            </div>

            <div>
                {t('profile-right-arrow')}
            </div>
        </section>
    );
}

