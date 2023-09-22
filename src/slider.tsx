import "./Draw.css";

export function Slider(props: any) {









    return (
        <div>
            <input
                className='#size-slider'
                type="range"
                min={props.min || 0}
                max={props.max || 100}
                step={1}
                value={props.value}
                onChange={props.onChange}

            />
            <p>Brush Size: {props.value}</p>
        </div>
    );

}

export default Slider;
