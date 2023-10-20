import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import './PokemonTile.scss';
import colors from '../../func/type-colors.ts';
import Type from '../Type/Type.tsx';
import pokBall from '../../assets/images/pokeball-watermark.png';


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

interface PokemonProps {
    url: string;
}

export default function PokemonTile({ url }: PokemonProps) {
    const navigate = useNavigate();

    const [data, setData] = useState<DataPok>({ id: 0, src: '', name: '' });
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
    }, [url]);

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
    },  [typeRaw]);

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
    

    return (
        <>
            <div className='PokemonTile' style={{ backgroundColor: typeProcessed?.type1 ? colors.colorsTile[typeProcessed.type1] : 'white' }} onClick={ () =>{ navigate(`/pokemon?id=${data.id}`)}}>
                <img src={pokBall} alt='' id='pokeboll' />
                <img src={data.src} alt='' id='pokemon' />
                <div className='data'>
                    <p id='id'>{stringHandler(data.id)}</p>
                    <p id='nome'>{data.name}</p>
                    <div className='PokemonType'>
                    {typeProcessed?.type1 && Object.entries(typeProcessed).map(([key, value]) => (
                        <Type typePok={value} key={key}/>
                    ))}
                    </div>
                </div>
            </div>
        </>
    );
}
