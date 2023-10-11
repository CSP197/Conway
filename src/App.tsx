import React, { useCallback, useState, useRef } from 'react';
import { produce } from 'immer';
import './App.css';

// Number of rows 
// and columns for
// the grid
const numRows = 50;
const numCols = 50;

// List of possible
// directions to
// check for 
// neighbors on grid
const operations = [
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
const generateEmptyGrid = () => {
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

const randomInt = (min: number, max: number) => {
  // generating a random number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 
function runEpoch( 
  setRunning: React.Dispatch<React.SetStateAction<boolean>>, 
  running: boolean, 
  runningRef: React.MutableRefObject<boolean>, 
  runSimulation: () => void, 
  alwaysRun?: boolean)
  {
    if( alwaysRun){
      setRunning(true);
      runningRef.current = true;
      runSimulation();
    } else {
      setRunning(!running);
      if(!running) {
        runningRef.current = true;
        runSimulation();
      }
  }
  
}

function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    // base case check
    if( !runningRef.current){
      return;
    }
    //simulate
    setGrid((g) => {
      return produce(g, gridCopy => {
        for( let i = 0; i < numRows; i++){
          for( let j = 0; j < numCols; j++){
            let neighbors = 0;
              operations.forEach(([x, y]) => {
                const newI = i + x;
                const newJ = j + y;
                if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                  neighbors += g[newI][newJ]
                }
              });

              if( neighbors < 2 || neighbors > 3){
                gridCopy[i][j] = 0;
              } else if( g[i][j] === 0 && neighbors === 3){
                gridCopy[i][j] = 1;
              }
          }
        } 
      });
    });
    setTimeout(runSimulation, 100);
  }, []);
  return (
    <>
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Conway's <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">Game of Life</mark></h1>
    <div className="inline-flex">
      <button onClick={() => {
        runEpoch(setRunning, running, runningRef, runSimulation);
        }} className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => {
        const rows = [];
        for(let i = 0; i <numRows; i++){
          rows.push(Array.from(Array(numCols), () => Math.random() > 0.8 ? 1 : 0));
        }
        setGrid(rows);
        runEpoch(setRunning, running, runningRef, runSimulation, true);
        }} className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'>
        Random
      </button>
      <button onClick={() => {
        setGrid(generateEmptyGrid());
        setRunning(false);
        }} className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'>
        Clear
      </button>
    </div>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map(
          (rows, i) => rows.map(
            (_, j) => (
              <div 
                key={`${i}-${j}`}
                onClick={() => {
                  const newGrid = produce(grid, gridCopy => {
                    gridCopy[i][j] = gridCopy[i][j] ? 0 : 1;
                  })
                  setGrid(newGrid)
                  // grid[i][k] = 1
                }}
                style={
                {
                  width: 20, 
                  height: 20, 
                  backgroundColor: grid[i][j] ? `rgb(${randomInt(0,255)} ${randomInt(0,255)} ${randomInt(0,255)} / 0.5)` : undefined, 
                  border: "solid 1px black"
                }
            }/>
          ))
        )}
      </div>
    </>
  );
}

export default App;


