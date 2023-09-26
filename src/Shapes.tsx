import Konva from 'konva';
import circleShape from './icons/circle.svg';
import rectangle from './icons/rectangle.svg';
import triangle from './icons/triangle.svg';

import { RectConfig } from 'konva/lib/shapes/Rect';

import React, { useEffect, useRef } from 'react';
import { Circle, Rect, RegularPolygon, Transformer } from 'react-konva';







export function Triangle({ callback, selected }: any) {



  return (
    <div>



      <li className={`option tool ${selected === "triangle" ? 'active' : ''}`} id="triangle" onClick={() => callback()}>
        <img src={triangle} alt="" />
        <span>Triangle</span>

      </li>
    </div>
  )
}
export function CircleShape({ callback, selected }: any) {
  return (
    <div>

      <li className={`option tool ${selected === "circle" ? 'active' : ''}`} id="circle" onClick={callback}>

        <img src={circleShape} alt="" />
        <span>Circle</span>
      </li>

    </div>
  )
}
export function Rectangle({ callback, selected }: any) {
  return (
    <div>

      <li className={`option tool ${selected === "rectangle" ? 'active' : ''}`} id="rectangle" onClick={callback}>
        <img src={rectangle} alt="" />
        <span>Rectangle</span>

      </li>
    </div>
  )
}






export interface Shape extends RectConfig {
  id: string;

}

export const SelectedShape: React.FC<{
  shapeProps: Shape;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: Shape) => void;
  onDelete: (shapeProps: Shape) => void,
}> = ({ shapeProps, isSelected, onSelect, onChange, onDelete }) => {
  const rectRef = useRef<Konva.Rect | null>(null);
  const polygonRef = useRef<Konva.RegularPolygon | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);

  const circleRef = useRef<Konva.Circle | null>(null);





  useEffect(() => {



    if (isSelected) {
      if (shapeProps.type === 'rectangle') {
        trRef.current?.nodes([rectRef.current!]);
      } else if (shapeProps.type === 'triangle') {
        trRef.current?.nodes([polygonRef.current!]);
      }
      else if (shapeProps.type === 'circle') {
        trRef.current?.nodes([circleRef.current!]);
      }
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected, shapeProps.type]);


  if (shapeProps.type === 'rectangle') {



    return (

    <>

      <Rect

        onClick={onSelect}
        onTap={onSelect}
        ref={rectRef}
        {...shapeProps}
        draggable={isSelected}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target?.x() || 0,
            y: e.target?.y() || 0,
          });
        }}
        onTransformEnd={(e) => {
          const node = rectRef.current!;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX();
          node.scaleY();
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}

          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}

    </>

    );
  }

  else if (shapeProps.type === 'triangle') {



    // Render a triangle
    return (



      <>
      <RegularPolygon
        onClick={onSelect}
        onTap={onSelect}
        ref={polygonRef}
        {...shapeProps}

        draggable={isSelected}

        sides={3} // Number of sides for a triangle
        radius={50} // Radius of the triangle
       // Fill color
        stroke="black" // Stroke color
        strokeWidth={2}


        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target?.x() || 0,
            y: e.target?.y() || 0,
          });
        }}
        onContextMenu={(e) => {
          e.evt.preventDefault();
          onDelete(shapeProps);
        }}
        onTransformEnd={(e) => {
          const node = polygonRef.current!;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX();
          node.scaleY();
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />


      )}
      </>

    );
  }



  else if (shapeProps.type === 'circle'){

    return (

      <>

      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={circleRef}
        {...shapeProps}
        draggable={isSelected}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target?.x() || 0,
            y: e.target?.y() || 0,
          });
        }}
        onContextMenu={(e) => {
          e.evt.preventDefault();
          onDelete(shapeProps);
        }}
        onTransformEnd={(e) => {
       
          const node = circleRef.current!;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX();
          node.scaleY();
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}

          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}

      </>
        );

  }


  return <></>

};

