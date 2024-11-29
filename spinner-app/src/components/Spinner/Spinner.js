import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
import PieSegment from "./PieSegments";
import InputListRow from "../InputList/InputListRow";
import { v4 as uuidv4 } from 'uuid';
uuidv4();

// Define the colors
const miffyColors = [
  { red: 0.968, green: 0.839, blue: 0.776 }, // Soft Peach
  { red: 0.925, green: 0.929, blue: 0.941 }, // Light Gray
  { red: 0.976, green: 0.486, blue: 0.482 }, // Miffy Red
  { red: 0.549, green: 0.839, blue: 0.776 }, // Soft Mint
  { red: 0.949, green: 0.788, blue: 0.196 }, // Miffy Yellow
  { red: 0.835, green: 0.608, blue: 0.608 }, // Dusty Rose
  { red: 0.486, green: 0.686, blue: 0.776 }, // Sky Blue
];

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Spinner = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [input, setInput] = useState("");
  const [segments, setSegments] = useState([]); // Manage segments locally
  const pickerAngle = 90; // Fixed picker position (e.g., 12 o'clock)

  const [colorSequence, setColorSequence] = useState(shuffleArray(miffyColors));
  const colorIndexRef = useRef(0);

  // const previousColorRef = useRef(null); // Ref to store the previous color
  // const randomColor = () => {
  //   const miffyColors = [
  //     { red: 0.968, green: 0.839, blue: 0.776 }, // Soft Peach
  //     { red: 0.925, green: 0.929, blue: 0.941 }, // Light Gray
  //     { red: 0.976, green: 0.486, blue: 0.482 }, // Miffy Red
  //     { red: 0.549, green: 0.839, blue: 0.776 }, // Soft Mint
  //     { red: 0.949, green: 0.788, blue: 0.196 }, // Miffy Yellow
  //     { red: 0.835, green: 0.608, blue: 0.608 }, // Dusty Rose
  //     { red: 0.486, green: 0.686, blue: 0.776 }  // Sky Blue
  //   ];

  //   const previousColor = previousColorRef.current;
  //   // filter the array to exclude the previous color
  //   const availableColors = miffyColors.filter(color => {
  //     // check if the current color matches the previous color
  //     if (previousColor) {
  //       return !(color.red === previousColor.red && color.green === previousColor.green && color.blue === previousColor.blue);
  //     }
  //     // if no previousColor is provided, include all the colors
  //     return true;

  //   });

  //   // generate a randpm index within the range of the filtered array
  //   const randomIndex = Math.floor(Math.random() * availableColors.length);
  //   const selectedColor = availableColors[randomIndex];

  //   previousColorRef.current = selectedColor;

  //   // Log the previous and new colors
  //   // console.log("Previous Color:", previousColor);
  //   // console.log("New Color:", selectedColor);

  //   return selectedColor;
  // };

  const getNextColor = () => {
    // Get the next color in the sequence
    const nextColor = colorSequence[colorIndexRef.current];
    colorIndexRef.current++;

    // Reset and reshuffle if all colors are used
    if (colorIndexRef.current >= colorSequence.length) {
      setColorSequence(shuffleArray(miffyColors));
      colorIndexRef.current = 0;
    }

    return nextColor;
  };

  const addItem = () => {
    if (!input.trim()) {
      alert("Uh oh, you need to add something");
      return;
    }

    setSegments([...segments, { id: uuidv4(), label: input, color: getNextColor() }]);
    setInput("");
  };

  const deleteItem = id => {
    setSegments(segments.filter(segment => segment.id !== id))
  }

  const editItem = (id, newLabel) => {
    setSegments(
      segments.map((segment) =>
        segment.id === id ? { ...segment, label: newLabel } : segment
      )
    );
  };


  useEffect(() => {
    console.log("Updated Segments:", segments);
  }, [segments]); // Trigger whenever `segments` changes

  const spin = () => {
    if (isSpinning || segments.length === 0) return;
    setIsSpinning(true);

    const duration = Math.random() * 5 + 2; // Random duration
    const targetAngle = rotationAngle + 360 * 3 + Math.random() * 360;

    setRotationAngle(targetAngle);

    setTimeout(() => {
      const normalizedAngle = (targetAngle % 360 + 360) % 360; // Normalize the angle to 0-360
      const adjustedAngle = (360 - (normalizedAngle + pickerAngle) % 360) % 360; // Adjust for picker position
      const segmentAngle = 360 / segments.length; // Angle covered by each segment
      const winningIndex = Math.floor(adjustedAngle / segmentAngle); // Calculate the winning segment

      setWinner(segments[winningIndex]);

      // setIsSpinning(false);
      setTimeout(() => setIsSpinning(false), 50); // Buffer for state sync
    }, duration * 1000);
  };

  return (
    <div className="spinner-container">
      {/* Spinner Section */}
      <div className="spinner">
        <h2>Help Me Pick!</h2>
        <svg
          viewBox="0 0 100 100"
          className="spinner-wheel"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transition: isSpinning ? "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
          }}
          onClick={spin}
        >
          {segments.length > 0 ? (
            segments.map((segment, index) => {
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
            })
          ) : (
            <PieSegment
              startAngle={0}
              endAngle={360}
              color="rgb(131, 53, 95)"
              label="Add Item"
            />
          )}
        </svg>
        
        <button
          id='spinBtn'
          onClick={spin}
          disabled={isSpinning || segments.length === 0} // Disable if no segments
        >
          {isSpinning ? "Spinning..." : "Click me to spin!"}
        </button>
        {winner && <div className="winner">Winner: <span
          style={{
            color: `rgb(${winner.color.red * 255}, ${winner.color.green * 255}, ${winner.color.blue * 255})`,
          }}
        >
          {winner.label}
        </span>
        </div>}
      </div>

      {/* Input List Section */}
      <div className="input-list">
        <h2>Add Items</h2>
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addItem();
              }
            }} // Save on Enter
            placeholder="Enter item"
          />
          <button
            id='addItemBtn'
            onClick={addItem}
            disabled={!input.trim()} // Disable button if input is empty
          >Add</button>
        </div>
        <ul>
          {segments.map((segment, index) => (
            <InputListRow
              key={segment.id}
              segment={segment}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Spinner;
