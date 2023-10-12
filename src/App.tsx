import { useCallback, useState, useRef } from 'react';
import { generateEmptyGrid } from './components/grid/Grid';
import { Header } from './components/header/Header';
import { Buttons } from './components/buttons/Buttons';
import { Grid } from './components/grid/Grid';
import SizeRange from './components/range/SizeRange';
import GameOfLife from "./GameOfLife";

export default function App() {
  const [gridSize, setgridSize] = useState([50, 50]);
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(gridSize);
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
      {Buttons(setRunning, running, runningRef, runSimulation, setGrid, gridSize)}
      <SizeRange />
      {Grid(grid, setGrid)}
    </>
  );
}
