import { useEffect, useState } from "react";

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

export default function crawler({url}:PokemonProps){
    const [data, setData] = useState<DataPok>({ id: '', src: '', name: '' });
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
        console.log(typeProcessed)
    }, [typeRaw]);

    return [data, typeProcessed]

}