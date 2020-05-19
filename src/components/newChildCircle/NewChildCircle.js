import React from 'react';

import ChildCircle from '../childCircle/ChildCircle';

const NewChildCircle = props => {
    const {array} = props

    return (
        <svg>
            {array.map(circle => {
                return <ChildCircle 
                            key={circle.id} 
                            circle={circle} 
                            number={array.length} 
                        />
            })}
        </svg>
    )

}

export default NewChildCircle;