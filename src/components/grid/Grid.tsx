import { produce } from "immer";

// Number of rows 
// and columns for
// the grid
export const numRows = 50;
export const numCols = 50;

// List of possible
// directions to
// check for 
// neighbors on grid
export const operations = [
    [ 0, -1],
    [ 0,  1],
    [ 1, -1],
    [ 1,  0],
    [ 1,  1],
    [-1, -1],
    [-1,  0],
    [-1,  1],
  ];

//
export const generateEmptyGrid = () => {
    const rows = [];
    for(let i = 0; i <numRows; i++){
      rows.push(
        Array.from(
          Array(numCols), 
          () => 0
        )
      );
    }
    return rows;
  }

// Generating a random number
export const randomInt = (
  min: number, 
  max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

// Grid
export function Grid(
  grid: number[][], 
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>) {
    return <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 20px)`
      }}>
      {grid.map(
        (rows, i) => rows.map(
          (_, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][j] = gridCopy[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
                // grid[i][k] = 1
              } }
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? `rgb(${randomInt(0, 255)} ${randomInt(0, 255)} ${randomInt(0, 255)} / 0.5)` : undefined,
                border: "solid 1px black"
              }} />
          ))
      )}
    </div>;
  }
  