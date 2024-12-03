import styles from "./InputList.module.css"
import React from "react"
import InputListRow from "./InputListRow"

const InputList = ({input, setInput, segments, addItem, deleteItem, editItem, showIcons, handleHide}) => {
    return (
        <div className={styles.inputList}>
            <h2>Add Items</h2>
            <div className={styles['input-group']}>
                <input
                  id = "inputField"
                  type = "text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addItem();
                  }}
                  placeholder="Enter your options here!"
                />
                <button id = "addItemBtn" onClick={addItem} disabled={!input.trim()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 50 50" width="50" height="50">
                    <path
                    d="M14.5,14.501l-10.502,0c-0.828,0 -1.5,0.673 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5l10.502,0l-0.001,10.502c0,0.828 0.672,1.5 1.5,1.501c0.828,-0 1.5,-0.673 1.5,-1.5l0.001,-10.503l10.502,0c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.827 -0.672,-1.5 -1.5,-1.5l-10.502,0l0.001,-10.501c-0,-0.828 -0.672,-1.501 -1.5,-1.501c-0.828,0 -1.5,0.672 -1.5,1.5l-0.001,10.502Z" />
                </svg>
                </button>
            </div>
            <ul className= {styles.pieSlices} style={
                {
                    border: segments.length > 0 ? '1.5px solid black' : 'none',
                    padding: '10px',
                    borderRadius: segments.length > 0 ? '10px' : '0',
                }
            }
            >
                {segments.map((segment) => (
                    <InputListRow
                        key={segment.id}
                        segment={segment}
                        deleteItem={deleteItem}
                        editItem={editItem}
                        handleHide={handleHide}
                        showIcons={showIcons}
                    />
                    ))}
            </ul>
        </div>
    )
}

export default InputList;
