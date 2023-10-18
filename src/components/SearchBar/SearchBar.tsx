import React from 'react';
import './SearchBar.scss';
import lupa from '../../assets/lupa.png'

interface SearchProps {
    value: string
    onChange: (searchTerm: string) => void;
}

export default function SearchBar({value, onChange}:SearchProps){
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        onChange(event.target.value)
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
                        <input type="text" placeholder='Search' name='data' value={value} onChange={handleChange}/>
                        <img src={lupa} alt="" />
                    </div>
                </div>
            </div>
            
            
        </>
    )
}