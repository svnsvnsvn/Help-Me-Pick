import React from "react";

const InputListRow = ({ segment, deleteItem }) => {
  return (
    <div className='optionItem'>
      <span style={{ color: `rgb(${segment.color.red * 255}, ${segment.color.green * 255}, ${segment.color.blue * 255})`,}}>
        {segment.label}
      </span>
      <div>
        <p onClick={()=> deleteItem(segment.id)}>✗</p>
        <p onClick={()=> deleteItem(segment.id)}>✗</p>
      </div>

    </div>

  );
};

export default InputListRow;
