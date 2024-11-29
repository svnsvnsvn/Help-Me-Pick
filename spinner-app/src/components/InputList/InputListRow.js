import React, { useState } from "react";

const InputListRow = ({ segment, deleteItem, editItem }) => {
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
    <div className="optionItem">
      {isEditing ? (
        // Editing Mode
        <input
          type="text"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()} // Save on Enter
          className="editInput"
        />
      ) : (
        // Display Mode
        <span
          style={{
            color: `rgb(${segment.color.red * 255}, ${segment.color.green * 255}, ${segment.color.blue * 255})`,
          }}
        >
          {segment.label}
        </span>
      )}

      <div className="menuItems">
        {isEditing ? (
          // Show "Save" button in edit mode
          <p id="save" onClick={handleSave}>
            Save
          </p>
        ) : (
          // Show "Edit" and "Delete" buttons in display mode
          <>
            <p id="edit" onClick={handleEdit}>
              ✍🏾
            </p>
            <p id="trash" onClick={() => deleteItem(segment.id)}>
              🗑️
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default InputListRow;
