import { runEpoch } from "../common/Common";
import { generateEmptyGrid, numRows, numCols } from "../grid/Grid";

export function Buttons(
  setRunning: React.Dispatch<React.SetStateAction<boolean>>, 
  running: boolean, 
  runningRef: React.MutableRefObject<boolean>, 
  runSimulation: () => void, 
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>) {
  return <div className="inline-flex">
      <button onClick={() => {
          runEpoch(setRunning, running, runningRef, runSimulation);
      }} className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'>
          {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
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
  </div>;
}
