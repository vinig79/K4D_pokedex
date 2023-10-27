import React, { useEffect, useState } from 'react';
import moveCrawler from '../../func/moveCrawler';
import Type from '../Type/Type';

interface Props {
  url: string;
  limitMoves: number;
}

interface Move {
  name: string;
  type: string;
}

interface Moves {
  Moves: Move[];
}

export default function GridMove({ url, limitMoves }: Props) {
  console.log(limitMoves);
  const [move, setMove] = useState<Moves>({ Moves: [] });

  useEffect(() => {
    const fetchData = async () => {
      const movement = await moveCrawler(url, limitMoves);
      setMove(movement);
    };
    fetchData();
  }, [url, limitMoves]);

  function moveVerified() {
    if (move) {
      if(move.Moves){
        return (
          <>
            {move.Moves.map((value) => (
              <Type key={value.name} typePok={value.type} nameValue={value.name} />
            ))}
          </>
        );
      }
    }
    return null;
  }

  return <div className="Grid">{moveVerified()}</div>;
}
