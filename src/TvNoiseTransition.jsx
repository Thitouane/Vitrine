import React, { useEffect } from "react";
import "./TVNoiseTransition.css";

export default function TVNoiseTransition({ onEnd }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onEnd) onEnd();
    }, 50); // 0.05 seconde
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <div className="tv-noise-overlay">
      <div className="tv-noise" />
    </div>
  );
}