import React from "react";

import "../../styles/pages/Socials.css";
import RGBGlitch from "../effects/RGBGlitch";

export default function Socials() {
    return (
    <section className="reseaux-section">
    <div className="reseaux-box">
        <div className="reseaux-list">
            <RGBGlitch>
                <a href="https://github.com/Thitouane" target="_blank" rel="noreferrer">
                    <img src="/images/github.png" alt="GitHub" />
                    GitHub
                </a>
            </RGBGlitch>
            <RGBGlitch>
                <a href="https://thitouzg.itch.io/" target="_blank" rel="noreferrer">
                    <img src="/images/itchio.png" alt="Itch.io" />
                    Itch.io
                </a>
            </RGBGlitch>
            <RGBGlitch>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                    <img src="/images/twitter.png" alt="Twitter" />
                    Twitter
                </a>
            </RGBGlitch>
        </div>
        </div>
    </section>
    );
}