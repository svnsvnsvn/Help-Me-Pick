import React, { useState, useEffect } from "react";
import "./styles.css";

const Spinner = ({ segments }) => {
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
      <svg viewBox="0 0 100 100" className="spinner-wheel">
        {segments.map((segment, index) => {
          const startAngle = (360 / segments.length) * index;
          const endAngle = startAngle + 360 / segments.length;

          return (
            <path
              key={index}
              d={`M50 50 L${50 + 50 * Math.cos((startAngle * Math.PI) / 180)} 
                            ${50 + 50 * Math.sin((startAngle * Math.PI) / 180)} 
                            A50 50 0 0 1 
                            ${50 + 50 * Math.cos((endAngle * Math.PI) / 180)} 
                            ${50 + 50 * Math.sin((endAngle * Math.PI) / 180)} Z`}
              fill={segment.color}
            />
          );
        })}
      </svg>
      <button onClick={spin} disabled={isSpinning}>
        Spin
      </button>
      {winner && <div>Winner: {winner.label}</div>}
    </div>
  );
};

export default Spinner;
