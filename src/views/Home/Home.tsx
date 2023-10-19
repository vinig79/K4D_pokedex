import { useEffect, useState } from 'react';
import './Home.scss';
// Components 
import SearchBar from '../../components/SearchBar/SearchBar';
import PokemonTile from '../../components/PokemonTile/PokemonTile';
import Footer from '../../components/Footer/Footer';

type Url = { url: string };
type ResultsInter = { results: Url[] };
type ResultType = ResultsInter | object;

const LIMIT: number = 3;

export default function Home() {
    const [info, setInfo] = useState<ResultType>({});
    const [data, setData] = useState<string>('');
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        document.title = "Home";
        const rootElement = document.querySelector('#root') as HTMLElement;
        if (rootElement) {
            rootElement.style.backgroundColor = 'white';
        }
    }, []);

    useEffect(() => {
        if (data) {
            setInfo({ results: [{ url: `https://pokeapi.co/api/v2/pokemon/${data}` }] });
        } else {
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network error');
                    }
                    return response.json();
                })
                .then((response) => {
                    setInfo(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [data, offset]);

    return (
        <>
            <SearchBar value={data} onChange={(search:string) => { setData(search) }} />

            <div className='InfoTile'>
                <h1>Pokédex</h1>
                <div id='linha'></div>
                <p>Procure pelo Pokemon desejado utilizando seu nome ou ID</p>
            </div>
            {('results' in info && Array.isArray(info.results)) &&
                info.results.map((pok: Url, index: number) => (
                    <PokemonTile key={index} url={pok.url} />
                ))
            }

            <Footer limit={LIMIT} total={60} setOffset={setOffset} offset={offset} />
        </>
    );
}
