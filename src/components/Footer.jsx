import { useState, useEffect } from "react";
import "../utils/i18n"; // ✅ Initialisation i18n
import { useTranslation } from 'react-i18next'; // ✅ Import nécessaire

import "../styles/Footer.css";

export default function Footer({ page, handlePageChange }) {
    const { t, i18n } = useTranslation(); // ✅ Hook i18n
    const [currentLang, setCurrentLang] = useState(i18n.language);
    
    const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    };

    return (
    <section>
        <footer className="footer-controls">
            <div className="footer-content">
                <div className="footer-left">
                    <img
                    src="/images/fr.png"
                    alt="Français"
                    className={`flag ${currentLang === 'fr' ? 'active' : ''}`}
                    />
                    <img
                    src="/images/gb.png"
                    alt="English"
                    className={`flag ${currentLang === 'en' ? 'active' : ''}`}
                    />
                </div>
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
    </section>
    );
}