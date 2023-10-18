import { useState } from 'react';
import './PokemonTile.scss';
import Type from '../Type/Type.tsx'
import pokBoll from '../../assets/pokeball-watermark.png';


interface data {
    id  : string,
    src : string,
    name: string
}

interface pokemonProps {
    url: string,
}

export default function PokemonTile({ url }: pokemonProps){
    const [data, setData] = useState<data>({'id': '', 'src':'', 'name':''})

    fetch(`${url}`).then((response) =>{return response.json()}).then((response) =>{
        const id_b : number = response.id
        const src  : string = response.sprites.other['official-artwork'].front_default
        const name : string = response.name
        let   id   : string 

        if( id_b < 10){
            id = `#00${id_b}`
        }else if (id_b < 100){
            id = `#0${id_b}`
        }else{
            id = `#${id_b}`
        }
        setData({'id':id, 'src':src, 'name':name})
        
    })

     
    return (
        <>
            <div className='PokemonTile'>
                <img src={pokBoll} alt="" id='pokeboll' />
                <img src={data.src} alt="" id='pokemon'  />
                <div className='data'>
                    <p id='id'>{data.id}</p>
                    <p id='nome'>{data.name}</p>
                    <div className='PokemonType'><Type/><Type/> </div>
                </div>
                
            </div>
        </>
    )
}