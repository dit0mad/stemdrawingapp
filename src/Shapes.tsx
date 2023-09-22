import circle from './icons/circle.svg';
import rectangle from './icons/rectangle.svg';
import triangle from './icons/triangle.svg';







export function Triangle({callback, selected}: any) {



  return (
    <div>



      <li className={`option tool ${selected === "triangle" ? 'active' : ''}`} id="triangle"  onClick={callback}>
        <img src={triangle} alt="" />
        <span>Triangle</span>

      </li>
    </div>
  )
}
export function Circle({callback, selected}: any) {
  return (
    <div>

      <li className={`option tool ${selected === "circle" ? 'active' : ''}`} id="circle"  onClick={callback}>

        <img src={circle} alt="" />
        <span>Circle</span>
      </li>

    </div>
  )
}
export function Rectangle({callback, selected}: any) {
  return (
    <div>

      <li className={`option tool ${selected === "rectangle" ? 'active' : ''}`} id="rectangle" onClick={callback}>
        <img src={rectangle} alt="" />
        <span>Rectangle</span>

      </li>
    </div>
  )
}


