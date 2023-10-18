import { useEffect, useState } from 'react';
import './Home.scss';
//components 
import SearchBar from '../../components/SearchBar/SearchBar';
import PokemonTile from '../../components/PokemonTile/PokemonTile';
import Footer from '../../components/Footer/Footer';

type url = { url: string }
type resultsInter = { results: url[] }
type resultType = resultsInter | object


export default function Home(){
    const [info, setInfo] = useState<resultType>([])
    const [data, setData] = useState<string>('')

    
    
    useEffect(()=>{
        document.title = "Home";
    })

    useEffect(() =>{
        
    if(data){
            setInfo({ "results" : [{"url" : `https://pokeapi.co/api/v2/pokemon/${data}`}]})
            console.log("oi")   
    }else if(!data){
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=3`)
        .then((response) => { return response.json()})
        .then((response) => {
            setInfo(response)
        })
    }

    }, [data]);
   

    return(
        <>
            <SearchBar value={data} onChange={ (search:any) => { setData(search) }}/>
            
            <div className='InfoTile'>
                <h1>Pokédex</h1>
                <div id='linha'></div>
                <p>Procure pelo Pokemon desejado utilizando seu nome ou ID</p>
            </div>
            {info.results &&  info.results.map(( pok: object , index:number) => {
                return <PokemonTile key={index} url={pok.url} />
                
            })}

            <Footer/>
        </>
    );
}