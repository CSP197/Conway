import { produce } from "immer";

// Number of rows 
// and columns for
// the grid
// export const numRows = 50;
// export const numCols = 50;

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
export const generateEmptyGrid = (
  gridSize: number[]
  ) => {
    const rows = [];
    const numRows = gridSize[0];
    const numCols = gridSize[1];
    for(let i = 0; i < numRows; i++){
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

interface Props {
  grid: number[][], 
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>
}

// Grid
export function Grid(
  {
    grid, 
    setGrid
  }: Props) {
    return (<div 
      id='outer'
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grid[0].length}, 20px)`
      }}
      className="grid"
      >
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
    </div>);
  }
  