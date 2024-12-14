import styles from "./Spinner.module.css"
import React from "react";
import PieSegment from "./pieSegments";
import {getRGBFromCSSVariable} from "../utils/utils";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const SpinnerWheel = ({ segments, rotationAngle, isSpinning, spin }) => {
    const visibleSegments = segments.filter((s) => !s.hidden);
    const segmentAngle = 360 / visibleSegments.length; // Angle per visible segment

    // Extract the theme color
    const defaultWheel = getRGBFromCSSVariable("--secondary");

    return (

        <div>

            <svg className={styles.spinnerBackground} viewBox="0 0 110 110">
              <circle cx="53.5" cy="79" r="50"/>
            </svg>

            <svg
            className={styles.spinnerWheel}
            viewBox="0 0 100 100"
            style={{
                transform: `rotate(${rotationAngle}deg)`,
                transition: isSpinning ? "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
            }}
            onClick={spin}
            // onTransitionEnd={handleSpinEnd}
        >
            {visibleSegments.length > 0 ? (
                visibleSegments.map((segment, index) => {
                    const startAngle = segmentAngle * index;
                    const endAngle = startAngle + segmentAngle;
                    return (
                        <PieSegment
                            key={segment.id}
                            startAngle={startAngle}
                            endAngle={endAngle}
                            color={{
                                red: segment.color.red,
                                green: segment.color.green,
                                blue: segment.color.blue,
                              }}                            
                            label={segment.label}
                        />
                    );
                })
            ) : (
                <PieSegment startAngle={0} endAngle={360} color={defaultWheel} label="Add Item" />
            )}
        </svg>

        </div>
        
    );
};

export default SpinnerWheel;