import styles from "./Spinner.module.css"
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import InputList from "../InputList/InputList";
import MenuBar from "../Menu/MenuBar";
import { ThemeProvider } from "../utils/themesContext";
import { useThemeContext } from "../utils/themesContext";
import useColorSequence from "./useColorSequence";
import Wheel from "./SpinnerWheel";

import hmpLogo from '../media/logo.png';
import winnerConfetti from '../media/confetti.gif'


const Spinner = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [input, setInput] = useState("");
  const [segments, setSegments] = useState([]);
  const pickerAngle = 90; // Picker position at 12 o'clock
  const [showIcons, setShowIcons] = useState(false);
  const [chosenOptions, setChosenOptions] = useState({});
  const [isHistoryPopupVisible, setIsHistoryPopupVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { switchTheme } = useThemeContext(); 
  const [title, setTitle] = useState("Help Me Pick!"); // Title state
  const [isEditingTitle, setIsEditingTitle] = useState(false); 
  const [gifSrc, setGifSrc] = useState(winnerConfetti);


  const handleThemeChange = (newTheme) => {
    const wheelColors = switchTheme(newTheme); // Get updated colors
    setSegments((prevSegments) =>
      prevSegments.map((segment, index) => ({
        ...segment,
        color: wheelColors[index % wheelColors.length],
      }))
    );
  };
  
  const getNextColor = useColorSequence();

  /**
   * Handles title click to toggle edit mode.
   */
  const handleTitleClick = () => {
    setIsEditingTitle(true); // Enable edit mode
  };

  /**
   * Handles title change when editing.
   * @param {Event} event - The input event
   */
  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Update title state
  };

  /**
   * Exits the edit mode and finalizes the title.
   */
  const handleTitleBlur = () => {
    setIsEditingTitle(false); // Exit edit mode
  };

  /**
   * Handles Enter key to finalize the title.
   * @param {KeyboardEvent} event - The keyboard event
   */
  const handleTitleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditingTitle(false); // Exit edit mode
    }
  };

  /**
   * Hides the popup by setting its visibility state to false.
   *
   * Functionality:
   * 1. Updates the `isPopupVisible` state to `false`, ensuring the popup is no longer visible.
   */
  const handleClose = () => {
    setIsPopupVisible(false); // Set to false to hide the popup
  };

  /**
   * Toggles the visibility of icons in the UI.
   *
   * Functionality:
   * 1. Flips the `showIcons` state between `true` and `false`.
   * 2. Can be used to show or hide additional UI elements dynamically.
   */
  const toggleIcons = () => {
    setShowIcons((prevShowIcons) => !prevShowIcons);
  };

  /**
   * Toggles the visibility of the history popup.
   *
   * Functionality:
   * 1. Flips the `isHistoryPopupVisible` state between `true` and `false`.
   * 2. Can be used to display or hide historical data in the application.
   *
   */
  const toggleHistory = () => {
    setIsHistoryPopupVisible((prev) => !prev);
  };

  /**
   * Adds a new item to the segments array.
   *
   * Functionality:
   * - Validates the `input` field to ensure it's not empty or just whitespace.
   * - Creates a new segment object with:
   *   - A unique ID (`uuidv4`).
   *   - A label (from `input`).
   *   - A color (from `getNextColor`).
   *   - A `hidden` flag (default: `false`).
   * - Appends the new segment to the `segments` array.
   * - Clears the `input` field after adding the item.
   *
   * Alerts:
   * - Displays an alert if the input is empty or invalid.
   *
   */
  const addItem = () => {
    if (!input.trim()) {
      alert("Please enter a valid item.");
      return;
    }
    setSegments([...segments, { id: uuidv4(), label: input, color: getNextColor(), hidden: false }]);
    setInput("");
  };

  /**
   * Removes a segment from the `segments` array based on its ID.
   *
   * Parameters:
   * @param {string} id - The unique identifier of the segment to be deleted.
   *
   * Functionality:
   * - Filters out the segment with the matching ID from the `segments` array.
   * 
   */
  const deleteItem = (id) => {
    setSegments(segments.filter((segment) => segment.id !== id));
  };

  /**
   * Toggles the visibility (hidden state) of a specific segment.
   *
   * Parameters:
   * @param {string} id - The unique identifier of the segment to be toggled.
   *
   * Functionality:
   * - Finds the segment with the matching ID.
   * - Toggles its `hidden` property between `true` and `false`.
   *
   */
  const handleHide = (id) => {
    setSegments(
      segments.map((segment) =>
        segment.id === id ? { ...segment, hidden: !segment.hidden } : segment
      )
    );
  };

  /**
   * Resets the wheel by clearing all segments and resetting the winner.
   *
   * Parameters:
   * @param {Array} segments - (Optional) Current segments (not used in this implementation).
   *
   * Functionality:
   * - Sets the `segments` state to an empty array.
   * - Resets the `winner` state to `null`.
   *
   */
  const resetWheel = (segments) => {
    setSegments([]);
    setWinner(null);
  };

  /**
   * Edits the label of a specific segment.
   *
   * Parameters:
   * @param {string} id - The unique identifier of the segment to be edited.
   * @param {string} newLabel - The new label for the segment.
   *
   * Functionality:
   * - Finds the segment with the matching ID.
   * - Updates its `label` property to the provided `newLabel`.
   *
   */
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

  useEffect(() => {
    if (winner) {
      setChosenOptions((prevChosenOptions) => {
        const existingOption = prevChosenOptions[winner.label] || { count: 0, ids: [] };

        // Avoid adding duplicate IDs
        const updatedIds = existingOption.ids.includes(winner.id)
          ? existingOption.ids
          : [...existingOption.ids, winner.id];

        return {
          ...prevChosenOptions,
          [winner.label]: {
            count: existingOption.count + 1,
            ids: updatedIds,
          },
        };
      });
    }
  }, [winner]);

  useEffect(() => {
    if (winner) {
      // Update the GIF source with a timestamp to ensure it reloads
      setGifSrc(`${winnerConfetti}?t=${Date.now()}`);
    }
  }, [winner]);
  
const spin = () => {
  const visibleSegments = segments.filter((s) => !s.hidden);

  if (isSpinning || visibleSegments.length === 0) return; // Prevent spinning if no visible segments
  setIsSpinning(true);

  // const duration = Math.random() * 5 + 2; // Spin duration

  // Choose a random duration (3, 4, or 5 seconds)
  const durations = [3, 4, 5];
  const duration = durations[Math.floor(Math.random() * durations.length)];

  const targetAngle = rotationAngle + 360 * 3 + Math.random() * 360;

  setRotationAngle(targetAngle);

  setTimeout(() => {
    const normalizedAngle = (targetAngle % 360 + 360) % 360; // Normalize to 0-360
    const adjustedAngle = (360 - (normalizedAngle + pickerAngle) % 360) % 360; // Align with picker

    const segmentAngle = 360 / visibleSegments.length; // Angle per visible segment
    const winningIndex = Math.floor(adjustedAngle / segmentAngle);

    setWinner(visibleSegments[winningIndex]); // Correctly pick the winner from visible segments
    setIsPopupVisible(true);
    setTimeout(() => setIsSpinning(false), 50);
  }, duration * 1000);
  
};

  return (
    
    
    <div>
    <header>
      <img id = "logo" src={hmpLogo} alt=""></img>
      <button id = "aboutus" href='#'>About HMP</button>
    </header>
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}>
      {isEditingTitle ? (
            <input
              type="text"
              className={styles.titleInput}
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyPress}
              autoFocus
            />
          ) : (
            <h2 className={styles.title} onClick={handleTitleClick}>
              {title}
            </h2>
          )}

          <div className={styles.wheel}>
            

            {/* Static heart picker */}
            <svg
            className={styles.picker}
            style={{
              top: "50", // Adjust to position it above the spinner
              left: "50%",
              transform: "translateX(-50%)", // Center horizontally
          }}
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
              <path d="M26 26C26 43.8144 48 62 48 62C48 62 70 43.8144 70 26" stroke="#E36F6F" stroke-width="51" stroke-linecap="round"/>
            </svg>
            <ThemeProvider>
            <Wheel
              segments={segments}
              rotationAngle={rotationAngle}
              isSpinning={isSpinning}
              spin={spin}
            /> 
            </ThemeProvider>
          </div>
          
          {winner && winner.label && (
            <>
              {isPopupVisible && (
                <>
                  {/* Full-screen GIF */}
                  <div className={styles.gifContainer}>
                    <img
                      src={gifSrc}
                      alt="Winner Celebration"
                      className={styles.winnerGif}
                    />
                  </div>

                  {/* Popup Content */}
                  <div className={`${styles.winner} ${styles.popup}`}>
                    <h3>
                      <span
                        style={{
                          color: `var(--primary)`,
                        }}
                      >
                        {winner.label}
                      </span>
                    </h3>
                    <div className={styles.winnerBtns}>
                      <button onClick={() => handleHide(winner.id)}>
                        {segments.find((segment) => segment.id === winner.id)?.hidden
                          ? "Unhide Choice"
                          : "Hide Choice"}
                      </button>
                      <button onClick={handleClose}>Done</button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

        </div>

        <div className={styles.inputList}>
          <InputList
          input={input}
          setInput={setInput}
          segments={segments}
          addItem={addItem}
          deleteItem={deleteItem}
          editItem={editItem}
          showIcons = {showIcons}
          handleHide={handleHide}
        />  
        </div>
          
        <div className={styles.menu}>
          <MenuBar
          toggleIcons={toggleIcons}
          resetWheel={resetWheel}
          toggleHistory={toggleHistory}
          applyCustomTheme={handleThemeChange}
        />
        </div>

        {isHistoryPopupVisible && (
          <div className={`${styles.history} ${styles.popup}`}>

            <div className={styles.historyBoxHeader}>

              <h3>History</h3>
              <p class = "subtext">View the selected options here.</p>
            </div>
            <div className= {styles.historyBoxContent}>
              <ul>
                {Object.entries(chosenOptions).map(([option, data]) => (
                  <li key={option}> 
                    {option}: {data.count} time{data.count > 1 ? "s" : ""}
                  </li>
                ))}
              </ul>

              {/* <button onClick={toggleHistory}>Close</button> */}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Spinner;