import { useRef, useState, useContext, useEffect } from 'react';
import {shuffleArray} from '../utils/utils'
import { ThemeContext } from '../utils/themesContext'; // Import ThemeContext

/**
 * 
 * @returns 
 */
const useColorSequence = () => {
    const { currentTheme } = useContext(ThemeContext);
    const [colorSequence, setColorSequence] = useState([]);
    const colorIndexRef = useRef(0);

    // Update color sequence whenever the theme changes
    useEffect(() => {
        if (currentTheme?.wheelColors) {
            const shuffledColors = shuffleArray(currentTheme.wheelColors);
            setColorSequence(shuffledColors);
            colorIndexRef.current = 0; // Reset the index when theme changes
        } else {
            console.warn("No wheelColors found in currentTheme:", currentTheme);
        }
    }, [currentTheme])

    /**
     * Retrieves the next color from the current color sequence and updates the sequence if necessary.
     *
     * Functionality:
     * 1. Retrieves the color at the current index (`colorIndexRef.current`) from `colorSequence`.
     * 2. Increments the `colorIndexRef.current` to point to the next color in the sequence.
     * 3. If the index exceeds the length of the sequence, it reshuffles the colors using `shuffleArray`
     *    and resets the index to 0 to start a new sequence.
     *
     * Returns:
     * @returns {string} The next color in the sequence.
     */
    const getNextColor = () => {
        const nextColor = colorSequence[colorIndexRef.current];
        colorIndexRef.current++;

        if (colorIndexRef.current >= colorSequence.length) {
            setColorSequence(shuffleArray(colorSequence));
            colorIndexRef.current = 0;
        }

        return nextColor;
    };
    return getNextColor;
};

export default useColorSequence;
