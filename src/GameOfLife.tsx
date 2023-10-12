import { produce } from 'immer';
import { operations} from './components/grid/Grid';

export default function GameOfLife(g: number[][]) {
  return produce(g, gridCopy => {
    for( let i = 0; i < g.length; i++){
      for( let j = 0; j < g[0].length; j++){
        let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < g.length && newJ >= 0 && newJ < g[0].length) {
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
}
