import {useEffect, useState } from 'react'
import moveCrawler from '../../func/moveCrawler'
import Type from '../Type/Type'

interface props{
    url: string,
    limitMoves: number
}

interface Move{
    name : string
    type : string
}

interface Moves{
    Moves: Move[]
}

export default function Grid({url, limitMoves}:props){
    const [move, setMove] = useState<Moves>();
    useEffect(() =>{
        const movement: Moves = moveCrawler(url)
        setMove(movement)
    }, [url])

    function moveVerified(){
        if(move){
            if(move.Moves){
                
                return(
                <>
                    { move?.Moves && Object.entries(move.Moves) .filter(([key]) => {Number(key) <= limitMoves }).map(([key, value]) => (
                        <Type key={key} typePok={value.type} nameValue={value.name} />
                    ))}
                </>
                )
            }
        }
    }
    
    return (
        <div className="Grid">
          {moveVerified()}
        </div>
      );
}