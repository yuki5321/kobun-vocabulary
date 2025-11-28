import React, { useRef, useEffect } from 'react';

interface DrumRollPickerProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
}

const DrumRollPicker: React.FC<DrumRollPickerProps> = ({ min, max, value, onChange }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const itemHeight = 40; // Height of each item in pixels

    // Generate array of numbers
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    // Scroll to the selected value on mount and update
    useEffect(() => {
        if (scrollRef.current) {
            const index = value - min;
            scrollRef.current.scrollTop = index * itemHeight;
        }
    }, [value, min]);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollTop = scrollRef.current.scrollTop;
            const index = Math.round(scrollTop / itemHeight);
            const newValue = min + index;
            if (newValue !== value && newValue >= min && newValue <= max) {
                onChange(newValue);
            }
        }
    };

    return (
        <div className="drum-roll-container">
            <div className="drum-roll-highlight"></div>
            <div
                className="drum-roll-scroll"
                ref={scrollRef}
                onScroll={handleScroll}
            >
                <div className="drum-roll-spacer"></div>
                {numbers.map((num) => (
                    <div
                        key={num}
                        className={`drum-roll-item ${num === value ? 'active' : ''}`}
                        onClick={() => onChange(num)}
                    >
                        {num}
                    </div>
                ))}
                <div className="drum-roll-spacer"></div>
            </div>
        </div>
    );
};

export default DrumRollPicker;
