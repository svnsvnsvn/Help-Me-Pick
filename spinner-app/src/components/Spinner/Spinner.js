import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
import PieSegment from "./PieSegments";
import InputListRow from "../InputList/InputListRow";
import MenuBar from "../Menu/MenuBar";
import { v4 as uuidv4 } from "uuid";
// uuidv4();

// Define the color palette
const miffyColors = [
  { red: 0.968, green: 0.839, blue: 0.776 }, // Soft Peach
  { red: 0.925, green: 0.929, blue: 0.941 }, // Light Gray
  { red: 0.976, green: 0.486, blue: 0.482 }, // Miffy Red
  { red: 0.549, green: 0.839, blue: 0.776 }, // Soft Mint
  { red: 0.949, green: 0.788, blue: 0.196 }, // Miffy Yellow
  { red: 0.835, green: 0.608, blue: 0.608 }, // Dusty Rose
  { red: 0.486, green: 0.686, blue: 0.776 }, // Sky Blue
];

// Fisher-Yates Shuffle for randomizing color sequence
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
  const [segments, setSegments] = useState([]);
  const pickerAngle = 90; // Picker position at 12 o'clock
  const [showIcons, setShowIcons] = useState(true); // Default: icons are visible

  const [colorSequence, setColorSequence] = useState(shuffleArray(miffyColors));
  const colorIndexRef = useRef(0);

  // Get the next color from the sequence
  const getNextColor = () => {
    const nextColor = colorSequence[colorIndexRef.current];
    colorIndexRef.current++;

    if (colorIndexRef.current >= colorSequence.length) {
      setColorSequence(shuffleArray(miffyColors));
      colorIndexRef.current = 0;
    }

    return nextColor;
  };

  const toggleIcons = () => {
    setShowIcons((prevShowIcons) => !prevShowIcons);
  };
  

  const addItem = () => {
    if (!input.trim()) {
      alert("Please enter a valid item.");
      return;
    }
    setSegments([...segments, { id: uuidv4(), label: input, color: getNextColor() }]);
    setInput("");
  };

  const deleteItem = (id) => {
    setSegments(segments.filter((segment) => segment.id !== id));
  };

  const editItem = (id, newLabel) => {
    setSegments(
      segments.map((segment) =>
        segment.id === id ? { ...segment, label: newLabel } : segment
      )
    );
  };

  useEffect(() => {
    console.log("Updated Segments:", segments);
  }, [segments]);

  const spin = () => {
    if (isSpinning || segments.length === 0) return;
    setIsSpinning(true);

    const duration = Math.random() * 5 + 2; // Spin duration
    const targetAngle = rotationAngle + 360 * 3 + Math.random() * 360;

    setRotationAngle(targetAngle);

    setTimeout(() => {
      const normalizedAngle = (targetAngle % 360 + 360) % 360; // Normalize to 0-360
      const adjustedAngle = (360 - (normalizedAngle + pickerAngle) % 360) % 360; // Align with picker
      const segmentAngle = 360 / segments.length;
      const winningIndex = Math.floor(adjustedAngle / segmentAngle);

      setWinner(segments[winningIndex]);
      setTimeout(() => setIsSpinning(false), 50);
    }, duration * 1000);
  };

  return (
    <div className="spinner-container">
      <div className="spinner">
        <h2>Help Me Pick!</h2>

        <svg className="spinner-background" viewBox="0 0 110 110">
          <circle cx="57.5" cy="65" r="50" fill="rgb(195,190,190)" stroke="rgb(0, 0, 0)" strokeWidth=".25" />
        </svg>

        <svg className="spinner-wheel" viewBox="0 0 100 100"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transition: isSpinning ? "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
          }}
          onClick={spin}>
        
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
          ) : 
            (<PieSegment startAngle={0} endAngle={360} color="rgb(131, 53, 95)" label="Add Item" />)}
        </svg>

        {/* <button onClick={spin} disabled={isSpinning || segments.length === 0}>
          {isSpinning ? "Spinning..." : "Click me to spin!"}
        </button> */}
        {winner && (
          <div className="winner">
            Winner: <span style={{ color: `rgb(${winner.color.red * 255}, ${winner.color.green * 255}, ${winner.color.blue * 255})` }}>
              {winner.label}
            </span>
          </div>
        )}
      </div>

      <div className="input-list">
        <h2>Add Items</h2>
        <div className="input-group">
          <input
            id="inputField"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addItem();
            }}
            placeholder="Enter item"
          />
          {/* <button onClick={addItem} disabled={!input.trim()}>Add</button> */}
          <button 
          id="addItemBtn" 
          onClick={addItem} 
          disabled={!input.trim()} 
          style={{
            border: 'none',
            padding: 0,
          }}
          aria-label="Add Item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-10 -10 50 50"
            width="50"
            height="50"
          >
            <path d="M14.5,14.501l-10.502,0c-0.828,0 -1.5,0.673 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5l10.502,0l-0.001,10.502c0,0.828 0.672,1.5 1.5,1.501c0.828,-0 1.5,-0.673 1.5,-1.5l0.001,-10.503l10.502,0c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.827 -0.672,-1.5 -1.5,-1.5l-10.502,0l0.001,-10.501c-0,-0.828 -0.672,-1.501 -1.5,-1.501c-0.828,0 -1.5,0.672 -1.5,1.5l-0.001,10.502Z"/>
          </svg>
        </button>

        </div>
        <ul className ="pieSlices"
        style={{
          border: segments.length > 0 ? '1.5px solid black' : 'none',
          padding: '10px',
          borderRadius: segments.length > 0 ? '10px' : '0',
        }}>
          {segments.map((segment) => (
            <InputListRow
              key={segment.id}
              segment={segment}
              deleteItem={deleteItem}
              editItem={editItem}
              showIcons={showIcons}
            />
          ))}
        </ul>
      </div>
      <div>
        <MenuBar toggleIcons={toggleIcons}></MenuBar>
      </div>
      
    </div>
  );
};

export default Spinner;
