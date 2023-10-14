import { useState } from "react";

interface Props {
    min: number,
    max: number,
    setGrid: React.Dispatch<React.SetStateAction<number[][]>>,
    gridSize: number[],
    generateEmptyGrid: (gridSize: number[]) => number[][],
    setGridSize: React.Dispatch<React.SetStateAction<number[]>>
}

export default function RangeSlider(
    {
        min,
        max,
        setGrid,
        gridSize,
        generateEmptyGrid,
        setGridSize
    }: Props) {

    const [value, setValue] = useState(gridSize[0]);

    const onChange = ( event: any ) => {
        event.preventDefault();
        const newValue = +event.target.value;
        setValue(newValue);
        setGridSize([newValue, newValue]);
        setGrid(generateEmptyGrid(gridSize));
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
