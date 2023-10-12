import { useCallback, useState, useRef } from 'react';
import GameOfLife from "./GameOfLife";
import { generateEmptyGrid } from './components/grid/Grid';
import { Header } from './components/header/Header';
import { Buttons } from './components/buttons/Buttons';
import { Grid } from './components/grid/Grid';

export default function App() {
  
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    // base case check
    if (!runningRef.current){
      return;
    }
    // simulate
    setGrid((g) => GameOfLife(g));
    setTimeout(runSimulation, 100);
  }, []);

  return (
    <>
      <Header />
      {Buttons(setRunning, running, runningRef, runSimulation, setGrid)}
      {Grid(grid, setGrid)}
    </>
  );
}
