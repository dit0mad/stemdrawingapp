import React, { useRef } from 'react'

function Checkbox() {

    const fillColor = useRef(null);


  const  toolBtns  = document.getElementsByClassName(".tool");

  



  return (

  //   <p id="p1" onClick={alterStyle(this};">
  //   Click here to change background color.
  // </p>
    <div className='option'>
         <input type="checkbox" />
          <label  >Fill Color</label>
    </div>
  )
}

export default Checkbox