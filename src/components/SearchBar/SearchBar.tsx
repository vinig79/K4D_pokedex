import React , { ChangeEvent , useState} from 'react';
import './SearchBar.scss';
import lupa from '../../assets/lupa.png'

export default function SearchBar(){
    const [data, setData] = useState({data:""})

    const handleInput = (event: ChangeEvent<HTMLInputElement>) =>{
        setData({...data, [event.target.name]: event.target.value});
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
                        <input type="text" placeholder='Search' name='data' onChange={handleInput}/>
                        <img src={lupa} alt="" />
                    </div>
                </div>
            </div>
            
            
        </>
    )
}