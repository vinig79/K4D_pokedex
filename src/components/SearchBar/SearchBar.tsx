import React, {useState} from 'react';
import useDebounce from '../../func/useDebounce';
import './SearchBar.scss';
import lupa from '../../assets/lupa.png'

interface SearchProps {
    value: string
    onChange: () => void;
}

export default function SearchBar( {value, onChange}:SearchProps){

    const [displayValue, setDisplayValue] = useState<string>(value)
    const debounceChange = useDebounce(onChange, 500)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setDisplayValue(event.target.value)
        debounceChange(event.target.value)
        
    }

    return(
        <>
            <div className='container'>
                <div className='NavBar'>

                    <div className="esfera azul">
                        <div className="pequena-esfera"></div>
                    </div>
                    <div className="esfera marrom"></div>
                    <div className="esfera amarela"></div>
                    <div className="esfera verde"></div>

                    <div className='Search'>
                        <input type="text" placeholder='Search' name='data' value={displayValue} onChange={handleChange}/>
                        <img src={lupa} alt="" />
                    </div>
                </div>
            </div>
            
            
        </>
    )
}