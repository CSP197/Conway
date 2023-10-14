import { useState } from "react";

interface Props {
    min: number,
    max: number,
    setGrid: React.Dispatch<React.SetStateAction<number[][]>>,
    gridSize: number[],
    setGridSize: React.Dispatch<React.SetStateAction<number[]>>
}

export default function RangeSlider(
    {
        min,
        max,
        setGrid,
        gridSize,
        setGridSize
    }: Props) {

    const [value, setValue] = useState(gridSize[0]);

    const onChange = ( event: any ) => {
        event.preventDefault();
        const newValue = +event.target.value;
        setValue(newValue);
        setGridSize([newValue, newValue]);
        generateNewGrid();
    }

    function generateNewGrid(){
        const rows = [];
        const numRows = gridSize[0];
        const numCols = gridSize[1];
        for (let i = 0; i < numRows; i++) {
            rows.push(
                Array.from(
                    Array(numCols), 
                    () => 0
                )
            );
        }
        setGrid(rows);
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
