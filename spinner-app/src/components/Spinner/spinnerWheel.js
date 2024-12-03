import styles from "./Spinner.module.css"
import React from "react";
import PieSegment from "./pieSegments";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const SpinnerWheel = ({ segments, rotationAngle, isSpinning, spin }) => {
    const visibleSegments = segments.filter((s) => !s.hidden);
    const segmentAngle = 360 / visibleSegments.length; // Angle per visible segment

    return (
        <svg
            className={styles.spinnerWheel}
            viewBox="0 0 100 100"
            style={{
                transform: `rotate(${rotationAngle}deg)`,
                transition: isSpinning ? "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
            }}
            onClick={spin}
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
                            color={`rgb(${segment.color.red * 255}, ${segment.color.green * 255}, ${segment.color.blue * 255})`}
                            label={segment.label}
                        />
                    );
                })
            ) : (
                <PieSegment startAngle={0} endAngle={360} color="var(--secondary-color)" label="Add Item" />
            )}
        </svg>
    );
};

export default SpinnerWheel;