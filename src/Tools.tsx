

import brush from './icons/brush.svg';
import eraser from './icons/eraser.svg';

export function Brush({ selected,callback }: any) {



    return (
        <div>
            <li className={`option tool ${selected === "pen" ? 'active' : ''}`} id="brush"  onClick={callback}>
                <img src={brush} alt="" />
                <span>Brush</span>
            </li>
        </div>
    )
}


export function Eraser({selected,callback} :any){

    return(
        <div>
              <li className={`option tool ${selected === "eraser" ? 'active' : ''}`} id="eraser"  onClick={callback}>
                <img src={eraser} alt="" />
                <span>Eraser</span>
            </li>
        </div>
    )
}