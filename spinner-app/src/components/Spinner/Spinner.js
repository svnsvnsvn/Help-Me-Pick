import React, { useState } from "react";
import PieSegment from "./PieSegments";
import "./styles.css";

const Spinner = ({ segments }) => {
  console.log(segments);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const duration = Math.random() * 5 + 2; // Random duration
    const targetAngle = rotationAngle + 360 * 3 + Math.random() * 360;

    setRotationAngle(targetAngle);

    setTimeout(() => {
      const segmentAngle = 360 / segments.length;
      const normalizedAngle = (targetAngle % 360 + 360) % 360;
      const winningIndex = Math.floor(normalizedAngle / segmentAngle);

      setWinner(segments[winningIndex]);
      setIsSpinning(false);
    }, duration * 1000);
  };

  return (
    <div className="spinner">
      {/* The SVG wheel */}
      <svg viewBox="0 0 100 100"
      className="spinner-wheel"
      style={{
          transform: `rotate(${rotationAngle}deg)`, // Apply rotation
          transition: isSpinning ? "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none", // Smooth spin
        }}
      >

        {segments.map((segment, index) => {
          const startAngle = (360 / segments.length) * index;
          const endAngle = startAngle + 360 / segments.length;

          return (
            <PieSegment
              key={index}
              startAngle={startAngle}
              endAngle={endAngle}
              color={`rgb(${segment.color.red * 255}, ${segment.color.green * 255}, ${segment.color.blue * 255})`}
              label={segment.label}
            />
          );
        })}
      </svg>
      <button onClick={spin} disabled={isSpinning}>
      {isSpinning ? "Spinning..." : "Spin"}
      </button>
      {winner && <div>Winner: {winner.label}</div>}
    </div>



  );
};

export default Spinner;
