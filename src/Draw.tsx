

import { useRef, useState, } from "react";

import { Slider } from "./slider";







import { DrawingContext } from "./types/Drawing_Context";





import "./Draw.css"

import { Brush, Eraser } from "./Tools"

import { Triangle, Circle, Rectangle } from "./Shapes";
import { useDraw } from "./hooks/useDraw";




export function Draw() {



  const toolBtns = useRef<HTMLUListElement>(null);

  const [pickedColor, setPickedColor] = useState('#4A98F7');
  const [pickedLineWidth, setPickedLineWidth] = useState(1.5);

  const colorPicker = useRef<HTMLInputElement | null>(null);

  const [selectedTool, setSelectedTool] = useState<string>("brush");

  const handleToolClick = (tool: string) => {

    setSelectedTool(tool);
    console.log(tool)

  };

  //onmouse down is sent from useDraw, we pass in the startDrawing func to start drwaing

  const { canvasRef, onMouseDown, } = useDraw(startDrawing);


  const setCanvasBackground = (ctx: CanvasRenderingContext2D, canvasRef: React.RefObject<HTMLCanvasElement>) => {
    // setting whole canvas background to white, so the downloaded img background will be white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
  }



  function startDrawing({ ctx, currentPoint, prevPoint }: DrawingContext) {

    const { x: currX, y: currY } = currentPoint
    const lineColor = pickedColor
    const lineWidth = pickedLineWidth
    let startPoint = prevPoint ?? currentPoint


    if (selectedTool === 'circle') {
      ctx.beginPath(); // creating new path to draw circle
      // getting radius for circle according to the mouse pointer
      ctx.strokeStyle = lineColor
      let radius = Math.sqrt(Math.pow((startPoint.x - currX), 2) + Math.pow((startPoint.y - currY), 2));
      ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
      ctx.stroke()


    }

    else if (selectedTool === 'rectangle') {
      ctx.strokeStyle = lineColor

      ctx.strokeRect(currY, currX, startPoint.x - currX, startPoint.y - currY);

    }

    else {




      ctx.beginPath()
      ctx.lineWidth = lineWidth

      ctx.moveTo(startPoint.x, startPoint.y)
      ctx.lineTo(currX, currY)
      ctx.stroke()
      ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : lineColor;

      ctx.fillStyle = lineColor
      ctx.beginPath()

      ctx.fill()
    }
  }






  const handleSliderChange = (event: any) => {


    setPickedLineWidth(event.target.value)

  }





  const clearCanvas = useRef(null);

  const saveImg = useRef(null);





  const changeColorPicker = (event: any) => {




    const currentColorPicker = colorPicker.current;

    if (currentColorPicker) {
      // Set the background color of the parent element
      const parentElement = currentColorPicker.parentElement;
      if (parentElement) {
        parentElement.style.background = event.target.value;
      }

      // Trigger a click event on the parent <li> element to simulate selection
      currentColorPicker.parentElement!.click();

      // Update the value state with the selected color
      setPickedColor(event.target.value);
    }

  }








  return (



    <div className="container">
      <section className="tools-board">
        <div className="row">
          <label className="title">Shapes</label>


          <ul className="options">



            <Triangle callback={() => handleToolClick('triangle')} selected={selectedTool} />
            <Circle callback={() => handleToolClick('circle')} selected={selectedTool} />
            <Rectangle callback={() => handleToolClick('rectangle')} selected={selectedTool} />

            <p className="flex">Selected Tool: {selectedTool}</p>




          </ul>
        </div>
        <div className="row">
          <label className="title">Options</label>
          <ul ref={toolBtns} className="options">
            <Brush callback={() => handleToolClick('brush')} selected={selectedTool} />
            <Eraser callback={() => handleToolClick('eraser')} selected={selectedTool} />
            <li className="option">
              <Slider max="30" min="1" value={pickedLineWidth} onChange={handleSliderChange} ></Slider>

            </li>
          </ul>
        </div>
        <div className="row colors">
          <label className="title">Colors</label>
          <ul className="options">
            <li className="option"></li>
            <li className="option selected"></li>
            <li className="option"></li>
            <li className="option"></li>
            <li className="option">
              <input ref={colorPicker} type="color" value={pickedColor} onChange={changeColorPicker} />
            </li>
          </ul>
        </div>
        <div className="row buttons">
          <button ref={clearCanvas} className="clear-canvas">Clear Canvas</button>
          <button ref={saveImg} className="submission">Send Submission</button>
        </div>
      </section>
      <section className="drawing-board">
        <canvas ref={canvasRef} width={750}
          height={750} onMouseDown={onMouseDown}  ></canvas>
      </section>
    </div>
  );




};



