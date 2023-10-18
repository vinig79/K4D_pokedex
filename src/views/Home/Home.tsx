import { useEffect, useState } from 'react';
import './Home.scss';
//components 
import SearchBar from '../../components/SearchBar/SearchBar';
import PokemonTile from '../../components/PokemonTile/PokemonTile';
import Footer from '../../components/Footer/Footer';

export default function Home(){
    const [info, setInfo] = useState<[]>([])
    const [data, setData] = useState<string>('')
    const [getItem, setGetItem] = useState<boolean>(true)
    
    

    useEffect(() =>{
        document.title = "Home";
        if(data){
        fetch(`https://pokeapi.co/api/v2/pokemon/${data}`)
            .then((response) => { return response.json()})
            .then((response) => {
                setInfo(response)
                console.log(info)
            })
            
        }else if(getItem){
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=3`)
            .then((response) => { return response.json()})
            .then((response) => {
                setInfo(response)
                setGetItem(false)
            })
        }

    });
   

    return(
        <>
            <SearchBar value={data} onChange={(search) => {setData(search)}}/>
            <div className='InfoTile'>
                <h1>Pokédex</h1>
                <div id='linha'></div>
                <p>Procure pelo Pokemon desejado utilizando seu nome ou ID</p>
            </div>
             
            <Footer/>
        </>
    );
}