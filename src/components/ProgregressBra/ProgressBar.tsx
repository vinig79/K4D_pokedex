import './ProgressBar.scss'; 
import colors  from "../../func/type-colors"

interface ProgressBarProps {
  value: number;
  key: string;
  barColor: string,
  nameStat: string
}

export default function ProgregressBar({ value, barColor, nameStat, key}:ProgressBarProps){
    const percentage = (value / 999) * 500;
    const colorItens = colors.colorsTile[barColor]
    
    return (
    <div key={key} className="progress-bar-container">
      <h1 id='nameStat' style={{ color:colorItens}}>{nameStat}</h1>
      <h1 id='value'> {value.toString().padStart(3, '0')}</h1>
      <div className="progress-bar-background">
          
          <div
            className="progress-bar-filler"
            style={{ width: `${percentage}%`, backgroundColor: colorItens }}
          >
            
            <span className="progress-bar-label"></span>
        </div>
      </div>
    </div>
  );
}
