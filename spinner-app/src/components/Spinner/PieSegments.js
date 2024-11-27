const PieSegment = ({ startAngle, endAngle, color, label }) => {
    return (
      <path
        d={`...`} // SVG path logic
        fill={color}
      >
        <text x="..." y="...">{label}</text>
      </path>
    );
  };
  
  export default PieSegment;
  