import {useRef } from 'react'
export default function useDebounce(fn: () => void , delay:number){
    
    const timeoutRef = useRef<number>()

    function decounceFn(...args:any){
        window.clearInterval(timeoutRef.current)
        timeoutRef.current = window.setTimeout(()=>{
            fn(...args)
        },delay)
    }

    return decounceFn;
} 