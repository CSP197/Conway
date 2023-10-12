// runEpoch
export function runEpoch(
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