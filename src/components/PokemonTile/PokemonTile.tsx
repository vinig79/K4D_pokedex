import './PokemonTile.scss';
import pokBoll from '../../assets/pokeball-watermark.png';

export default function PokemonTile() {
    return (
        <>
            <div className='PokemonTile'>
                 <img src={pokBoll} alt="" />
            </div>
        </>
    )
}