import { useCallback, useState, useRef } from 'react';
import { generateEmptyGrid } from './components/grid/Grid';
import { Header } from './components/header/Header';
import { Buttons } from './components/buttons/Buttons';
import { Grid } from './components/grid/Grid';
import RangeSlider from './components/slider/RangeSlider';
import GameOfLife from "./GameOfLife";

const SMALLEST_GRID_SIZE = 1;

export default function App() {
  const [
    gridSize, 
    setGridSize
  ] = useState([1,1]);
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
      <span />
      <Buttons 
        running={running} 
        setRunning={setRunning} 
        runningRef={runningRef} 
        runSimulation={runSimulation} 
        setGrid={setGrid} 
        gridSize={gridSize} 
      />
      <span />
      <RangeSlider 
        min={SMALLEST_GRID_SIZE} 
        max={50}
        gridSize={gridSize}
        setGridSize={setGridSize}
      />
      <span />
      <Grid 
        grid={grid} 
        setGrid={setGrid} 
      />
    </>
  );
}
