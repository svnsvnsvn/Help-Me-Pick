import React from "react";

const PieSegment = ({ startAngle, endAngle, color, label }) => {
  const isFullCircle = startAngle === 0 && endAngle === 360;
  // Truncate the label if it's too long
  const truncateLabel = (text, maxLength = 10) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  // Calculate SVG path for the segment
  const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
  const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
  const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
  const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);

  // Calculate the midpoint for placing the label
  const midAngle = (startAngle + endAngle) / 2;
  const labelRadius = 25; // Position closer to the edge
  const labelX = 50 + labelRadius * Math.cos((midAngle * Math.PI) / 180);
  const labelY = 50 + labelRadius * Math.sin((midAngle * Math.PI) / 180);

  // Calculate rotation for the label
  const rotationAngle = midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle; // Keep upright

  return (
    <>
      {/* Draw the segment */}
      <path
        d={isFullCircle
          ? `M50 50 m-50,0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0` // Full circle
          : `M50 50 L${x1} ${y1} A50 50 0 0 1 ${x2} ${y2} Z`} // Regular segment
        fill={color}
      />
      {/* Add the rotated label */}
      <text
        x={labelX}
        y={labelY}
        fill="black"
        fontSize="4"
        fontWeight="bold"
        textAnchor= 'middle'
        dominantBaseline="middle"
        transform={`rotate(${rotationAngle}, ${labelX}, ${labelY})`} // Rotate label
      >
       {truncateLabel(label)}
      </text>
    </>
  );
};

export default PieSegment;
