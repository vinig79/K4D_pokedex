import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVenusMars, faRuler, faWeightHanging } from '@fortawesome/free-solid-svg-icons'

import SearchBar from "../../components/SearchBar/SearchBar"
import Footer from "../../components/Footer/Footer"
import Type from '../../components/Type/Type';
import ProgressBar from '../../components/ProgregressBra/ProgressBar';
import GridMove from '../../components/GridMove/GridMove';


import './Pokemon.scss'
import colors from "../../func/type-colors"
import pokeBall from '../../assets/images/pokeball-watermark.png'


interface TypeRaw {
    type: {
        name: string;
    };
}

interface Stats {
    hp: number;
    atk: number;
    def: number;
    satk: number;
    sdef: number;
    spd: number
}

interface DataPok {
    id: number;
    src: string;
    name: string;
    height: number;
    weight: number;
}



const LIMIT: number = 4

export default function Pokemon() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    const url: string = `https://pokeapi.co/api/v2/pokemon/${myParam}`

    const [data, setData] = useState<DataPok>({ id: 0, src: '', name: '', height: 0, weight: 0 });
    const [stats, setStats] = useState<Stats>({ hp: 0, atk: 0, def: 0, satk: 0, sdef: 0, spd: 0 })
    const [typeRaw, setTypeRaw] = useState<TypeRaw[] | undefined>(undefined);
    const [typeProcessed, setTypeProcessed] = useState<{ type1: string; type2?: string }>();




    useEffect(() => {
        fetch(`${url}`)
            .then((response) => response.json())
            .then((response) => {
                const id: number = response.id;
                const src: string = response.sprites.other['official-artwork'].front_default;
                const name: string = response.name;
                const height: number = response.height * 10
                const weight: number = response.weight / 10
                const [hp, atk, def, satk, sdef, spd] = response.stats.map((stat: any ) => stat.base_stat)
                setStats({ hp, atk, def, satk, sdef, spd })

                setData({ id, src, name, height, weight });
                setTypeRaw(response.types);
            })


    }, [myParam, url]);

    console.log(stats)

    useEffect(() => {
        if (typeRaw) {
            const types: string[] = [];
            for (const type of typeRaw) {
                types.push(type.type.name);
            }
            if (types.length === 1) {
                setTypeProcessed({ type1: types[0] });
            } else if (types.length >= 2) {
                setTypeProcessed({ type1: types[0], type2: types[1] });
            }
        }

    }, [typeRaw]);

    useEffect(() => {
        document.title = data.name;
        const rootElement = document.querySelector('#root') as HTMLElement;
        if (rootElement) {
            rootElement.style.backgroundColor = typeProcessed?.type1 ? colors.colorsTile[typeProcessed.type1] : 'white';
        }
        const infoEement = document.querySelector('#Info') as HTMLElement
        if (infoEement) {
            infoEement.style.color = typeProcessed?.type1 ? colors.colorsTile[typeProcessed.type1] : 'white';
        }
        const statusElement = document.querySelector('#Stat') as HTMLElement
        if (statusElement) {
            statusElement.style.color = typeProcessed?.type1 ? colors.colorsTile[typeProcessed.type1] : 'white';
        }
        const abilitiesElement = document.querySelector('#Abilities') as HTMLElement
        if (abilitiesElement) {
            abilitiesElement.style.color = typeProcessed?.type1 ? colors.colorsTile[typeProcessed.type1] : 'white';
        }

    }, [typeProcessed, data.name]);


    const stringHandler = (inputNumber: number) => {
        const length = String(inputNumber).length
        return `#${'0'.repeat(3-length)}${inputNumber}`
    };

    return (
        <>
            <SearchBar />
            <div className='Screen'>
                <img src={pokeBall} alt="" />
                <div className='infoPok'>
                    <p id='id'>{stringHandler(data.id)}</p>
                    <p id='name'>{data.name}</p>
                </div>

            </div>
            <div className='Status'>
                <div id='pok'>
                    <img src={data.src} alt="" />
                    <div className='pokType'>
                        {typeProcessed?.type1 && Object.entries(typeProcessed).map(([key, value]) => (
                            <Type typePok={value} nameValue={value} key={key} />
                        ))}
                    </div>

                </div>
                <div className='Info'>

                    <h1 id='Info'>Info</h1>
                    <div className='GeneralStats'>
                        <div className='Peso'>
                            <FontAwesomeIcon className='FontAwesomeIcon' icon={faWeightHanging} style={{ color: "#cdcdcd", }} />
                            <h1>{data.weight}kg</h1>
                        </div>
                        <div className='Altura'>
                            <FontAwesomeIcon className='FontAwesomeIcon' icon={faRuler} style={{ color: "#cdcdcd", }} />
                            <h1>{data.height}cm</h1>
                        </div>
                        <div className='Sexo'>
                            <FontAwesomeIcon className='FontAwesomeIcon' icon={faVenusMars} style={{ color: "#cdcdcd", }} />
                            <h1>Male</h1>
                        </div>
                    </div>

                </div>
                <div className='SpecificStats'>
                    <div className='Stat'>
                        <h1 id="Stat">Stats</h1>
                        {stats && Object.entries(stats).map(([key, value]) => (
                            <ProgressBar value={value} barColor={typeProcessed?.type1 ? typeProcessed.type1 : 'red'} nameStat={key} key={key} />
                        ))}
                    </div>
                    <div className='gridContainer'>
                        <h1 id="Abilities">Abilities & Moves</h1>
                        <GridMove url={url} limitMoves={LIMIT} />
                    </div>
                </div>

            </div>

            <Footer />
        </>
    )
}