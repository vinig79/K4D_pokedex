import './Type.scss'
import colors from '../../func/type-colors'

interface TypePok {
    typePok: string,
    nameValue : string
}

export default function Type({typePok, nameValue}:TypePok){
    return(
        <>
            <div className='Type' style={{backgroundColor: colors.colorsType[typePok]}}>
                <p>
                    {nameValue}
                </p>
            </div>
        </>
    )
}