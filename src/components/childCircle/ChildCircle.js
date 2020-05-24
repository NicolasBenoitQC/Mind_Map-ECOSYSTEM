import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './childCircle.css';

const ChildCircle = props => {
    const {circle, number} = props;

    const numberOfCircle = number;
    const rotateFormule = 2*Math.PI/numberOfCircle;
    const originX = 50;
    const originY = 32.5;
    const outerCircleRadius = 25;
    const radius = 7;

    const centerOfCircleX = originX + ((outerCircleRadius) * Math.sin(rotateFormule*circle.id));
    const centerOfCircleY = originY - ((outerCircleRadius) * Math.cos(rotateFormule*circle.id));
    const id = circle.id;

    useEffect(() => {

    })

    return (
        <svg>
            <circle className='childCircle'
                key={id}
                cx={centerOfCircleX}
                cy={centerOfCircleY}
                r={radius}
                stroke='black' 
                strokeWidth='0.5'
                fill='gray' 
            />
            <foreignObject 
                className='containerChildDescriptionContainer'
                x={centerOfCircleX-7} 
                y={centerOfCircleY-5} 
                width='14'
                height='10'
                fontSize='20%'
                >
                <div className='childDescriptionContainer'>
                    <Link  to={{pathname: '/edit', aboutProps:{id: circle._id}}} className="childDescription">
                        {circle.title}
                    </Link>  
                </div>
            </foreignObject>
        </svg>
    )
}

export default ChildCircle;
