import styles from "./InputList.module.css";
import React, { useState } from "react";

const InputListRow = ({ segment, deleteItem, editItem, showIcons, handleHide }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(segment.label);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editInput.trim()) {
      alert("Label cannot be empty!");
      return;
    }
    editItem(segment.id, editInput);
    setIsEditing(false);
  };

  return (
    <div className= {styles.optionItem}>
      {isEditing ? (
        // Editing Mode
        <input
          type="text"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()} // Save on Enter
          className= {styles.editInput}

        />
      ) : (
        // Display Mode
        <span
          className={`${segment.hidden ? `${styles.hidden}` : ""}`}
          onClick={() => !isEditing && handleHide(segment.id)} // Only toggle hidden state if not editing
          style={{
            color: segment.hidden ? "black":`rgb(${segment.color.red * 255}, ${segment.color.green * 255}, ${segment.color.blue * 255})`,
            textDecoration: segment.hidden ? "line-through" : "none", cursor: "pointer",
          }}
        >
          {segment.label}
        </span>
      )}

      <div className= {styles.editItems}>
        {isEditing ? (
          <button id="save" onClick={handleSave}>
            Save
          </button>
        ) : (
          <>
            {showIcons && ( // Conditionally render icons based on showIcons
              <>
                <button
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                  aria-label="Edit Button"
                  onClick={handleEdit}
                >
                  
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125">
                    <path d="M28,82a8,8,0,0,0,2.2-.31l14-4a8,8,0,0,0,3.46-2L68.83,54.49l5.66-5.66,2.69-2.69A16.49,16.49,0,0,0,65.52,18h-.1a16.78,16.78,0,0,0-11.78,5.05l-2.46,2.46-5.66,5.66L24.34,52.34a8,8,0,0,0-2,3.46l-4,14A8,8,0,0,0,18,72,10,10,0,0,0,28,82ZM59.29,28.71A8.91,8.91,0,0,1,65.46,26h0a8.49,8.49,0,0,1,6,14.49l-1.69,1.69-12-12ZM30,58,51.17,36.83l1-1,12,12-1,1L42,70,28,74a2,2,0,0,1-2-2Z" />
                  </svg>
                </button>

                <button
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                  aria-label="Delete Item Button"
                  onClick={() => deleteItem(segment.id)}
                >

                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 100.0 125.0">
                    <path
                      d="m16.668 50c0-2.3008 1.8633-4.168 4.1641-4.168h58.336c2.3008 0 4.1641 1.8672 4.1641 4.168s-1.8633 4.168-4.1641 4.168h-58.336c-2.3008 0-4.1641-1.8672-4.1641-4.168z"
                      fill-rule="evenodd"
                    />
                  </svg>
                </button>

              </>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default InputListRow;
