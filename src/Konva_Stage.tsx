
import { Layer, Line, Stage, } from 'react-konva';


import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef } from 'react';
import { SelectedShape, Shape } from './Shapes';
import { shapes } from 'konva/lib/Shape';




export function KonvaStage(props: {
  shapes: Shape[],
  selectedColor : string,
  stageRef:React.MutableRefObject<any>,

  clearLines: () => void ,
  handleMouseUp: () => void,
  handleMouseDown: (e: KonvaEventObject<MouseEvent | TouchEvent>) => void,
  handleMouseMove: (e: KonvaEventObject<MouseEvent | TouchEvent>) => void,
  lines: {
    tool: string;
    points: number[];
}[],
selectedId: string | null,
selectShape: React.Dispatch<React.SetStateAction<string | null>>,
shapeList: Shape[],
setShapeList: React.Dispatch<React.SetStateAction<Shape[]>>,
strokeWidth: number,
onDelete: (shapeProps: Shape) => void,

}) {


  

 


  
  


  //can use useeffect to draw it everytime. when one of its functions is called;
  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage

    <Stage  ref={props.stageRef} width={window.innerWidth} height={window.innerHeight}

      onTouchStart={props.handleMouseDown}
       onMouseDown={props.handleMouseDown}
      onMousemove={props.handleMouseMove}
      onMouseup={props.handleMouseUp}>

      <Layer>

      {props.lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}

            stroke={props.selectedColor }
              strokeWidth={props.strokeWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}

      {props.shapes.map((shape, i) => {

    // Render a rectangle react component
    return (
      <SelectedShape
        key={i}
        shapeProps={shape}
        isSelected={shape.id === props.selectedId}
        onDelete = {props.onDelete}
        onSelect={() => {

          props.selectShape(shape.id);

       
        }}
        onChange={(newAttrs) => {
          const shapesCopy = [...props.shapeList];
          shapesCopy[i] = newAttrs;
          props.setShapeList(shapesCopy);
        }}
      />
    );

})}


      </Layer>
    </Stage>
  );
}