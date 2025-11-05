import React, { useEffect, useState } from "react";
import "../../styles/effects/RGBGlitch.css";

export default function RGBGlitch({
  children,
  className = "",
  intervalMin = 3000,
  intervalMax = 6000,
}) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let timeout;

    const triggerGlitch = () => {
      setIsGlitching(true);

      // durée du glitch courte
      setTimeout(() => setIsGlitching(false), 120 + Math.random() * 180);

      // prochain glitch aléatoire
      timeout = setTimeout(
        triggerGlitch,
        intervalMin + Math.random() * (intervalMax - intervalMin)
      );
    };

    triggerGlitch();
    return () => clearTimeout(timeout);
  }, [intervalMin, intervalMax]);

  // On merge les classes sans écraser
  const combinedClass = `rgb-glitch ${className} ${isGlitching ? "active" : ""}`.trim();

  return (
    <div className={combinedClass}>
      <div className="glitch-content">{children}</div>
      {isGlitching && (
        <>
          <div className="glitch-dup red">{children}</div>
          <div className="glitch-dup cyan">{children}</div>
        </>
      )}
    </div>
  );
}
