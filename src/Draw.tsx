

import { useRef, useState } from "react";

import { v4 as uuidv4 } from 'uuid';
import { KonvaStage } from "./Konva_Stage";
import { Slider } from "./slider";











import "./Draw.css";

import { Brush, Eraser } from "./Tools";

import { CircleShape, Rectangle, Triangle } from "./Shapes";


import { Shape } from "./Shapes";
import { useController } from "./hooks/useDraw";






export function Draw() {



  const toolBtns = useRef<HTMLUListElement>(null);

  const [pickedColor, setPickedColor] = useState('#4A98F7');
  const [pickedLineWidth, setPickedLineWidth] = useState(1.5);

  const colorPicker = useRef<HTMLInputElement | null>(null);

  const [selectedTool, setSelectedTool] = useState<string>("pen");








  const [shapes, setShapes] = useState<Shape[]>([]);




  const {
    stageRef,
    onDelete,
    setLines,
    setTool,
    handleMouseUp,
    handleMouseDown,
    lines,
    handleMouseMove,
     selectedId,
     selectShape,
     shapeList,
     setShapeList, } = useController(shapes, pickedColor,);


  const clearStage = () => {
    // Clear the shapes and lines from state
    //call function from konva
    setShapes([]);
    setLines([]);

  };

  const handleExport = () => {
    const uri = stageRef.current!.toDataURL();
    console.log(uri);
   
  };



  const handleToolClick = (tool: string) => {

    setTool(tool)
    setSelectedTool(tool);




    if (tool === "rectangle") {

      const shap: Shape = {
        id: uuidv4(),
        type: "rectangle",
        x: 20,
        y: 20,
        width: 50,
        height: 50,
        fill: pickedColor,
        shadowBlur: 5,




      }



      setShapes([...shapes, shap]);



    }

    else if (tool === "triangle") {




      const shape: Shape = {
        id: uuidv4(),
        type: "triangle",
        fill: pickedColor,
        shadowBlur: 5,



        x: 50,
        y: 50,


        stroke: "black", // Stroke color
        strokeWidth: 2, // Stroke width


      }



      setShapes([...shapes, shape]);

    }

    else if (tool === 'circle') {



      const shape: Shape = {
        id: uuidv4(),
        type: "circle",
        fill: pickedColor,
        shadowBlur: 5,



        x: 50,
        y: 50,


        stroke: "black", // Stroke color
        strokeWidth: 2, // Stroke width



        radius: 50




      }

      setShapes([...shapes, shape]);


    }


  };


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

    //when i click triangle it should add traingle to layer of konva.

    <div className="container">
      <section className="tools-board">
        <div className="row">
          <label className="title">Shapes</label>


          <ul className="options">



            <Triangle callback={() => handleToolClick('triangle')} selected={selectedTool} />

            <Rectangle callback={() => handleToolClick('rectangle')} selected={selectedTool} />
            <CircleShape callback={() => handleToolClick('circle')} selected={selectedTool} />

            <></>

            <p className="flex">Selected Tool: {selectedTool}</p>




          </ul>
        </div>
        <div className="row">
          <label className="title">Options</label>
          <ul ref={toolBtns} className="options">
            <Brush callback={() => handleToolClick('pen')} selected={selectedTool} />
            <Eraser callback={() => handleToolClick('eraser')} selected={selectedTool} />
            <li className="option">
              <Slider max="30" min="1" value={pickedLineWidth} onChange={handleSliderChange} ></Slider>

            </li>
          </ul>
        </div>
        <div className="row colors">
          <label className="title">Colors</label>
          <ul className="options">

            <li className="option">
              <input ref={colorPicker} type="color" value={pickedColor} onChange={changeColorPicker} />
            </li>
          </ul>
        </div>
        <div className="row buttons">
          <button ref={clearCanvas} onClick={clearStage} className="clear-canvas">Clear Canvas</button>
          <button ref={saveImg} onClick={handleExport} className="submission">Send Submission</button>
        </div>
      </section>
      <section className="drawing-board">
        <KonvaStage
        stageRef={stageRef}
          shapes={shapes}
          selectedColor={pickedColor}
          clearLines={clearStage}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          lines={lines}
          selectShape={selectShape}
          selectedId={selectedId}
          setShapeList={setShapeList}
          shapeList={shapeList}
          strokeWidth={pickedLineWidth}
          onDelete={onDelete}


        />
      </section>
    </div>
  );




};



