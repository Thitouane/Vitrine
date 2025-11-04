import React, { useEffect, useState } from "react";
import "../../styles/effects/RGBGlitch.css";

const RGBGlitch = ({ children }) => {
  const [glitchIndex, setGlitchIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const count = React.Children.count(children);
      const randomIndex = Math.floor(Math.random() * count);
      setGlitchIndex(randomIndex);

      setTimeout(() => setGlitchIndex(null), 200 + Math.random() * 200);
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, [children]);

  return (
    <div className="random-glitch-wrapper">
      {React.Children.map(children, (child, index) => (
        <div className="glitch-wrapper">
          <span className="glitch-base">{child}</span>
          {index === glitchIndex && (
            <>
              <span
                className="glitch-layer glitch-red"
                style={{
                  transform: `translate(${Math.random() * 6 - 3}px, ${
                    Math.random() * 4 - 2
                  }px)`,
                }}
              >
                {child}
              </span>
              <span
                className="glitch-layer glitch-cyan"
                style={{
                  transform: `translate(${Math.random() * 6 - 3}px, ${
                    Math.random() * 4 - 2
                  }px)`,
                }}
              >
                {child}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default RGBGlitch;
