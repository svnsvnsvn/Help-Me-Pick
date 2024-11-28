import React from "react";

const InputListRow = ({ segment }) => {
  return (
    <li>
      <span style={{ color: `rgb(${segment.color.red * 255}, ${segment.color.green * 255}, ${segment.color.blue * 255})`,}}>
        {segment.label}
      </span>
    </li>
  );
};

export default InputListRow;
