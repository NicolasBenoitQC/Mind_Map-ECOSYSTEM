import React from 'react';
import "./parentCircle.css";


const ParentCircle = props => {
    const titleParentCircle = 'Parent Circle';

    const originX = 50;
    const originY = 32.5;
    const innerCircleRadius = 15;
    const outerCircleRadius = 25;

    return (
        <svg >
            <circle className='parentCircle'
                cx={originX}
                cy={originY}
                r={innerCircleRadius}
                fill='gray'
                stroke='black'
                strokeWidth='0.3'
            />
            <foreignObject 
                x={originX-12.5} 
                y={originY-9} 
                width='25'
                height='18'
                fontSize="3"
                >
                <div xmlns="http://www.w3.org/1999/xhtml" className='parentDescriptionContainer'>
                    <span className='parentDescription' width='16' height='12'>
                        {titleParentCircle}
                    </span>
                </div>
            </foreignObject>
            <circle className='axeChildCircle'
                cx={originX}
                cy={originY}
                r={outerCircleRadius}
                fill='none'
                stroke='gray'
                strokeWidth='0.1'
            />

      
        </svg>
    )
}

export default ParentCircle;



/*
             <g transform="translate(50, 25)" >
                <circle fill="none" stroke="black" stroke-width="1px" r="6"/>
                <text stroke="blue" stroke-width="1px" text-anchor="middle" alignment-baseline="central">Look, I’m centered!</text>
            </g>


            <text x={originX} y={originY}
                textAnchor = 'middle' 
                textLength = '20'
                fontFamily="Verdana" 
                fontSize="3"
                width='20'
                >
                Parent circle
            </text>



*/