import React, { useEffect, useState } from "react";
import "./TVStartup.css";

export default function TVStartup({ onEnd }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onEnd) onEnd();
    }, 1200);
    return () => clearTimeout(timer);
  }, [onEnd]);

  if (!visible) return null;

  return (
    <div className="tv-startup-overlay">
      <div className="tv-flash">
        <div className="tv-flash-center" />
        <div className="tv-flash-horizontal" />
        <div className="tv-flash-vertical" />
      </div>
    </div>
  );
}