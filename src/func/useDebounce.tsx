import {useRef } from 'react'
export default function useDebounce<T>(fn: (arg: T) => void , delay:number){
    
    const timeoutRef = useRef<number>()

    function decounceFn(arg: T){
        window.clearInterval(timeoutRef.current)
        timeoutRef.current = window.setTimeout(()=>{
            fn(arg)
        },delay)
    }

    return decounceFn;
} 