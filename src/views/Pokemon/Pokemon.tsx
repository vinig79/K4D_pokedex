import {useEffect, useState} from 'react';
import {FaWeightHanging , FaRuler} from "react-icons/fa"

import SearchBar from "../../components/SearchBar/SearchBar"
import Footer from "../../components/Footer/Footer"
import Type from '../../components/Type/Type';
import './Pokemon.scss'
import colors  from "../../func/type-colors"
import pokeBall from '../../assets/images/pokeball-watermark.png'

interface TypeRaw {
    type: {
        name: string;
    };
}

interface DataPok {
    id: number;
    src: string;
    name: string;
}



export default function Pokemon(){
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    const url: string = `https://pokeapi.co/api/v2/pokemon/${myParam}`

    const [data, setData] = useState<DataPok>({ id: 0 , src: '', name: '' });
    const [typeRaw, setTypeRaw] = useState<TypeRaw[] | undefined>(undefined);
    const [typeProcessed, setTypeProcessed] = useState<{ type1: string; type2?: string }>();


    useEffect(() => {
        fetch(`${url}`)
            .then((response) => response.json())
            .then((response) => {
                const id: number = response.id;
                const src: string = response.sprites.other['official-artwork'].front_default;
                const name: string = response.name;
                setData({ id: id, src: src, name: name });
                setTypeRaw(response.types);
            });
            
    },[myParam, url]);

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
        document.title = "Home";
        const rootElement = document.querySelector('#root') as HTMLElement;
        if (rootElement) {
            rootElement.style.backgroundColor = typeProcessed?.type1 ? colors.colorsTile[typeProcessed.type1] : 'white';
        }
        const infoEement = document.querySelector('#Info') as HTMLElement
        if (infoEement){
            infoEement.style.color = typeProcessed?.type1 ? colors.colorsTile[typeProcessed.type1]: 'white';
        }
    }, [typeProcessed]);



    const stringHandler = (inputNumber: number) => {
        let id: string
        if (inputNumber < 10) {
            id = `#00${inputNumber}`;
        } else if (inputNumber < 100) {
            id = `#0${inputNumber}`;
        } else {
            id = `#${inputNumber}`;
        }

        return id
    };

    return(
        <>
            <SearchBar/>
            <div className='Screen'>  
                <img src={pokeBall} alt="" /> 
                <div className='infoPok'>
                    <p id='id'>{stringHandler(data.id)}</p>
                    <p id='name'>{data.name}</p>
                </div>
                
            </div>
            <div className='Status'>
                <div id='pok'>
                    <img  src={data.src} alt="" />
                    <div className='pokType'>
                        {typeProcessed?.type1 && Object.entries(typeProcessed).map(([key, value]) => (
                            <Type typePok={value} key={key}/>
                        ))}
                    </div>
                    
                </div>
                <div className='Info'>
    
                    <h1 id='Info'>Info</h1>
                    <div className='Peso'><FaWeightHanging/></div>
                    <div className='Altura'><FaRuler/></div>
                    <div className='Sexo'><p>Male</p></div>
                </div> 
            </div>
            
            <Footer/>
        </>
    )
}