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
                x={centerOfCircleX-7} 
                y={centerOfCircleY-7} 
                width='14'
                height='14'
                fontSize="3"
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


/*

            <foreignObject 
                x={centerOfCircleX-7} 
                y={centerOfCircleY-7} 
                width='14'
                height='14'
                fontSize="3"
                >
                    <span className='childDescription' x={centerOfCircleX-7} y={centerOfCircleY-7}  >
                        {circle.title}
                    </span>
            </foreignObject>

<a href="https://developer.mozilla.org/" className='childDescriptionContainer'>
                    <span className='childDescription' x="16" y="12" >
                        {circle.title}
                    </span>
                </a>



is now link with the click


<foreignObject 
                x={centerOfCircleX-6} 
                y={centerOfCircleY-3.5} 
                width='12'
                height='7'
                fontSize="3"
                >
                <div xmlns="http://www.w3.org/1999/xhtml" className='childDescriptionContainer'>
                    <span className='childDescription' width='16' height='12'>
                    {circle.title}
                    </span>
                </div>
            </foreignObject>



*/