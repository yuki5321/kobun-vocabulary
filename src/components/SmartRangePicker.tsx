import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface SmartRangePickerProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    label?: string;
}

const SmartRangePicker: React.FC<SmartRangePickerProps> = ({ min, max, value, onChange, label }) => {
    const [inputValue, setInputValue] = useState(value.toString());

    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        const num = parseInt(newValue);
        if (!isNaN(num) && num >= min && num <= max) {
            onChange(num);
        }
    };

    const handleBlur = () => {
        let num = parseInt(inputValue);
        if (isNaN(num)) {
            num = min;
        } else {
            num = Math.max(min, Math.min(max, num));
        }
        setInputValue(num.toString());
        onChange(num);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = parseInt(e.target.value);
        onChange(num);
    };

    const adjustValue = (delta: number) => {
        const newValue = Math.max(min, Math.min(max, value + delta));
        onChange(newValue);
    };

    return (
        <div className="smart-picker-container">
            {label && <div className="smart-picker-label">{label}</div>}

            <div className="smart-picker-controls">
                <button className="picker-btn" onClick={() => adjustValue(-10)} aria-label="-10">
                    <ChevronsLeft size={16} />
                </button>
                <button className="picker-btn" onClick={() => adjustValue(-1)} aria-label="-1">
                    <ChevronLeft size={16} />
                </button>

                <input
                    type="number"
                    className="picker-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    min={min}
                    max={max}
                />

                <button className="picker-btn" onClick={() => adjustValue(1)} aria-label="+1">
                    <ChevronRight size={16} />
                </button>
                <button className="picker-btn" onClick={() => adjustValue(10)} aria-label="+10">
                    <ChevronsRight size={16} />
                </button>
            </div>

            <div className="smart-picker-slider-container">
                <input
                    type="range"
                    className="picker-slider"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleSliderChange}
                />
                <div className="picker-range-labels">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>
        </div>
    );
};

export default SmartRangePicker;
