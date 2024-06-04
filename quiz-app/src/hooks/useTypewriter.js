import { useState, useEffect } from 'react';

const useTypewriter = (text, speed = 100, onComplete) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (index === text.length) {
                if (onComplete) onComplete();
                return;
            }

            setDisplayText((prevText) => prevText + text.charAt(index));
            setIndex((prevIndex) => prevIndex + 1);
        }, speed);

        return () => clearTimeout(timeoutId);
    }, [text, speed, index, onComplete]);

    useEffect(() => {
        // Reset displayText and index when text changes
        setDisplayText('');
        setIndex(0);
    }, [text]);

    return displayText;
};

export default useTypewriter;
