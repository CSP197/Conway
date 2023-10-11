import React, { useCallback, useState, useRef } from 'react';
import { produce } from 'immer';
// import logo from './logo.svg';
import './App.css';

const numRows = 50;
const numCols = 50;

const operations = [
  [ 0,  1],
  [ 0, -1],
  [ 1, -1],
  [-1,  1],
  [ 1,  1],
  [-1, -1],
  [ 1,  0],
  [-1,  0],
];

const generateEmptyGrid = () => {
  const rows = [];
  for(let i = 0; i <numRows; i++){
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
}

function runEpoch( 
  setRunning: React.Dispatch<React.SetStateAction<boolean>>, 
  running: boolean, 
  runningRef: React.MutableRefObject<boolean>, 
  runSimulation: () => void, 
  alwaysRun?: boolean)
  {
    if (alwaysRun){
      setRunning(true);
      runningRef.current = true;
      runSimulation();
    } else {
      setRunning(!running);
      if (!running) {
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
      <button onClick={() => {
        runEpoch(setRunning, running, runningRef, runSimulation);
        }}>
        {running ? 'STOP' : 'START'}
      </button>
      <button onClick={() => {
        const rows = [];
        for(let i = 0; i <numRows; i++){
          rows.push(Array.from(Array(numCols), () => Math.random() > 0.8 ? 1 : 0));
        }
        setGrid(rows);
        runEpoch(setRunning, running, runningRef, runSimulation, true);
      }}>RANDOM</button>
      <button onClick={() => {
        setGrid(generateEmptyGrid());
        setRunning(false);
      }}>CLEAR</button>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map(
          (rows, i) => rows.map(
            (col, j) => (
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
                  backgroundColor: grid[i][j] ? 'pink' : undefined, 
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


