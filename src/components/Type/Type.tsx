import './Type.scss'
import colors from '../../func/type-colors'

interface typePok {
    typePok: string
}

export default function Type({typePok}:typePok){
    return(
        <>
            <div className='Type' style={{backgroundColor: colors[typePok]}}>
                <p>
                    {typePok}
                </p>
            </div>
        </>
    )
}