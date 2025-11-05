import React, { useMemo } from "react";
import "../../styles/effects/ProgressBar.css";

/**
 * PixelProgressBar
 * props:
 *  - value (number 0-100)
 *  - segments (int) number of pixel blocks (default 20)
 *  - height (string) CSS height like '28px'
 *  - maxWidth (string) e.g. '420px' or '100%'
 *  - gap (string) gap between blocks e.g. '4px'
 *  - color (string) main color
 *  - bg (string) background block color
 *  - animated (bool) use stepped animation on change
 *  - showLabel (bool) display value label
 */
export default function ProgressBar({
  value = 0,
  segments = 20,
  height = "36px",
  maxWidth = "100%",
  gap = "6px",
  color = "#00ff99",
  bg = "#00120a",
  animated = true,
  showLabel = false,
  className = "",
  ariaLabel = "Progress"
}) {
  const clamped = Math.max(0, Math.min(100, Number(value || 0)));
  const filledCount = useMemo(() => Math.round((clamped / 100) * segments), [clamped, segments]);

  // inline style for container customizations
  const containerStyle = {
    ["--ppb-height"]: height,
    ["--ppb-gap"]: gap,
    ["--ppb-maxwidth"]: maxWidth,
    ["--ppb-color"]: color,
    ["--ppb-bg"]: bg,
    ["--ppb-animated"]: animated ? 1 : 0
  };

  return (
    <div className={`pixel-progress-wrap ${className}`} style={containerStyle}>
      <div
        className="pixel-progress"
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-valuetext={`${clamped}%`}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`pixel-segment ${i < filledCount ? "filled" : ""}`}
            data-index={i}
            aria-hidden="true"
          />
        ))}
      </div>

      {showLabel && (
        <div className="pixel-progress-label" aria-hidden="true">
          {clamped}%
        </div>
      )}
    </div>
  );
}
