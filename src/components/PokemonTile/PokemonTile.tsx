import './PokemonTile.scss';
import Type from '../Type/Type.tsx'
import pokBoll from '../../assets/pokeball-watermark.png';

interface typePokemon {
    type_1 : string,
    type_2?: string
}

interface pokemonProps {
    nome: string,
    src:  string,
    id:   string,
    typePokemon: typePokemon
}

export default function PokemonTile({nome , src , id , typePokemon}: pokemonProps){
    return (
        <>
            <div className='PokemonTile'>
                <img src={pokBoll} alt="" id='pokeboll' />
                <img src={src} alt="" id='pokemon'  />
                <div className='data'>
                    <p id='id'>#{id}</p>
                    <p id='nome'>{nome}</p>
                    <div className='PokemonType'><Type/><Type/> </div>
                </div>
                
            </div>
        </>
    )
}