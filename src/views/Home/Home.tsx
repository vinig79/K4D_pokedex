import { useEffect } from 'react';
import './Home.scss';
//components 
import SearchBar from '../../components/SearchBar/SearchBar';
import PokemonTile from '../../components/PokemonTile/PokemonTile';

export default function Home(){
    useEffect(() =>{
        document.title = "Home";
    });
    return(
        <>
            <SearchBar/>
            <div className='InfoTile'>
                <h1>Pokédex</h1>
                <div id='linha'></div>
                <p>Procure pelo Pokemon desejado utilizando seu nome ou ID</p>
            </div>
            <PokemonTile/>
            <PokemonTile/>
        </>
    );
}