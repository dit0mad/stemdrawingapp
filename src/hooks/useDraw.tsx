import { useEffect, useRef, useState } from "react"

import { KonvaEventObject } from "konva/lib/Node";
import { Shape } from "../Shapes";
import { KonvaNodeComponent, StageProps } from "react-konva/ReactKonvaCore";
import { Stage } from "konva/lib/Stage";



export const useController = (shapes : Shape[], fillColor : string, ) => {


  const [shapeList, setShapeList] = useState<Shape[]>(shapes);
  const [selectedId, selectShape] = useState<string | null>(null);
  const [tool, setTool] = useState<string>('pen');
  const [lines, setLines] = useState<{ tool: string; points: number[] }[]>([]);

  const stageRef = useRef<any>(null);

  const isDrawing = useRef(false);



  useEffect(() => {

  }, [shapeList])


  const handleMouseDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {

      //if a shape is selected that means we are not drawing.
      if(selectedId !== null){

        checkDeselect(e);
        return;
      }



    isDrawing.current = true;
    const pos = e.target.getStage()!.getPointerPosition();
    setLines([...lines, { tool, points: [pos!.x, pos!.y] }]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage()!;
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point!.x, point!.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };



  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const onDelete = (shapeProps: Shape) => {
    // Here, you can remove the shape from your state or perform any other desired action
    // For example, if you are using a state array to store shapes, you can filter out the shape to delete it:

    console.log(shapeProps.id)
   


    
    setShapeList(shapeList.filter((shape) => shape.id === shapeProps.id));
  };


  return {stageRef,onDelete,  handleMouseUp, handleMouseDown , lines, handleMouseMove, selectedId , selectShape, shapeList,  setShapeList, setLines, setTool};

}




