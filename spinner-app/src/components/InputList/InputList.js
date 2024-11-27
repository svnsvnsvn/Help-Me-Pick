import React, { useState } from "react";
import InputListRow from "./InputListRow";
import "./styles.css";

const InputList = ({ segments, setSegments }) => {
  const [input, setInput] = useState("");

  /**
 * Function to generate a random pastel color, avoiding a given previous color if provided.
 * @param {Object|null} previousColor - The previous color to exclude, or null if no exclusion is needed.
 * @returns {Object} A randomly selected pastel color as an object with red, green, and blue properties.
 */
  const randomColor = (previousColor = null) => {
    // Define an array of baby/pastel girly cutesy colors
    const pastelColors = [
        { red: 255 / 255, green: 204 / 255, blue: 204 / 255 }, // Baby Pink
        { red: 255 / 255, green: 229 / 255, blue: 204 / 255 }, // Baby Peach
        { red: 204 / 255, green: 255 / 255, blue: 204 / 255 }, // Baby Mint
        { red: 204 / 255, green: 229 / 255, blue: 255 / 255 }, // Baby Blue
        { red: 255 / 255, green: 204 / 255, blue: 255 / 255 }, // Baby Lavender
        { red: 255 / 255, green: 255 / 255, blue: 204 / 255 }, // Baby Yellow
        { red: 255 / 255, green: 204 / 255, blue: 229 / 255 }, // Baby Coral
        { red: 204 / 255, green: 204 / 255, blue: 255 / 255 }, // Baby Lilac
        { red: 255 / 255, green: 229 / 255, blue: 255 / 255 }, // Baby Blush
        { red: 204 / 255, green: 255 / 255, blue: 255 / 255 }  // Baby Aqua
    ];
    
    // filter the array to exclude the previous color
    const availableColors = pastelColors.filter(color => {
        // check if the current color matches the previous color
        if(previousColor){
            return !(color.red === previousColor.red && color.green === previousColor.green && color.blue === previousColor.blue);
        }
        // if no previousColor is provided, include all the colors
        return true;

    });

    // generate a randpm index within the range of the filtered array
    const randomIndex = Math.floor(Math.random() * availableColors.length);

    // 


  };

  const addItem = () => {
    if (!input.trim()) return;
    setSegments([...segments, { label: input, color: randomColor() }]);
    setInput("");
  };

  return (
    <div className="input-list">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {segments.map((segment, index) => (
          <InputListRow key={index} segment={segment} />
        ))}
      </ul>
    </div>
  );
};

export default InputList;
