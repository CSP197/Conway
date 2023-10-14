import { useState } from "react";

interface Props {
    min: number,
    max: number,
    gridSize: number[],
    setGridSize: React.Dispatch<React.SetStateAction<number[]>>
}

export default function RangeSlider(
    {
        min,
        max,
        gridSize,
        setGridSize
    }: Props) {

    const [value, setValue] = useState(gridSize[0]);

    const onChange = ( event:any ) => {
        event.preventDefault();
        const newValue = +event.target.value;
        // console.log(`The new value is ${newValue}`);
        setValue(newValue);
        setGridSize([newValue, newValue]);
    }

    return (
        <input 
            type="range" 
            min={min} 
            max={max}
            step="1"
            value={value} 
            className="range range-success"
            onChange={ onChange }
        />
    );
}
