import './Type.scss'
import colors from '../../func/type-colors'

interface TypePok {
    typePok: string
}

export default function Type({typePok}:TypePok){
    return(
        <>
            <div className='Type' style={{backgroundColor: colors.colorsType[typePok]}}>
                <p>
                    {typePok}
                </p>
            </div>
        </>
    )
}