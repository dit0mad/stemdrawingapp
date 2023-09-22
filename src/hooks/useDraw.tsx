import { useEffect, useRef, useState } from "react"
import { DrawingContext, Point } from "../types/Drawing_Context";


export const useDraw = (    startDrawing: ({ ctx, currentPoint, prevPoint } : DrawingContext  ) => void) => {


    //create ref and pass to hoomepage

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mouseDown, setMousedown] = useState(false);

    const prevPointRef = useRef<null | Point>(null);

    const onMouseDown = () => setMousedown(true);






    
    const setCanvasBackground = (ctx : CanvasRenderingContext2D, canvasRef: React.RefObject<HTMLCanvasElement>) => {
        // setting whole canvas background to white, so the downloaded img background will be white
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
    }



    //  whenever useDraw is called useeffect will run

    useEffect(() => {


        const getRelativeSize = (e: MouseEvent) => {
            const canvas = canvasRef.current!;





            const offset = canvas.getBoundingClientRect();
            const x = e.clientX - offset.left
            const y = e.clientY - offset.top
            return { x, y }

        }

        const handler = (e: MouseEvent) => {

            if (!mouseDown) return

            const currentPoint = getRelativeSize(e)!;

            const ctx = canvasRef.current?.getContext('2d')!

            if (!currentPoint || !ctx) return



            startDrawing({ ctx, currentPoint, prevPoint: prevPointRef.current })

            //after excuting currentpoint is the prevpoint for the next point

            prevPointRef.current = currentPoint;


            //get initial mouse codinates

        }
        const mouseUpHandler = () => {
            setMousedown(false)
            prevPointRef.current = null
        }

        //addeventlisteners

        canvasRef.current?.addEventListener("mousemove", handler);
        canvasRef.current?.addEventListener('mouseup', mouseUpHandler)

       

        return () => {   
            canvasRef.current?.removeEventListener("mousemove", handler)
            canvasRef.current?.removeEventListener('mouseup', mouseUpHandler)}


    }, [mouseDown, startDrawing])

    return { canvasRef, onMouseDown };

}


