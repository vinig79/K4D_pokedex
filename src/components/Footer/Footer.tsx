import React from 'react'
import seta from '../../assets/seta.png'
import './Footer.scss'
type pageValues = { limit: number , total: number, offset:number, setOffset: (elem:number) => void}

export default function Footer( {limit , total, offset, setOffset}: pageValues){
    const current: number = offset ? (offset/limit) + 1 : 1;
    const pages = Math.ceil(total/limit)
    function onPageChange(page:number){
        setOffset((page - 1) * limit)
    }

    return(
        <>
           <footer>
            <div className='BackPage' onClick={ () => onPageChange(current - 1) }  ><img src={seta} alt="" /></div>
            <div className='Page'><h1>{`${current}/${pages}`}</h1></div>
            <div className='NextPage' onClick={ () => onPageChange(current + 1) } >  </div>
           </footer>
        </>
    )
}