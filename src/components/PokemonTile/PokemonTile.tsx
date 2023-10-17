import './PokemonTile.scss';
import pokBoll from '../../assets/pokeball-watermark.png';
import pikachu from '../../assets/pikachu.png';

export default function PokemonTile(){
    return (
        <>
            <div className='PokemonTile'>
                <img src={pokBoll} alt="" id='pokeboll' />
                <img src={pikachu} alt="" id='pokemon'  />
                <div className='data'>
                    <p id='id'>#id</p>
                    <p id='nome'>Pikachu</p>
                </div>
            </div>
        </>
    )
}