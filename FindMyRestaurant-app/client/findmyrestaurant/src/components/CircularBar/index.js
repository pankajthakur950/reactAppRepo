
import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function CircularBar(props) {
    return (
        <div className={`circular-bar ${props.classes}`}>
            <CircularProgressbar value={props.value} maxValue={5}
                text={props.value}
                styles={buildStyles({
                    textColor: "#DB3944",
                    pathColor: "#DB3944"
                })} />
            <span className="circular-bar__text">{props.text}</span>
        </div>
    );
}
