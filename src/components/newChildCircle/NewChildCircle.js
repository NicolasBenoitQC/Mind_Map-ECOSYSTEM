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





/*
class NewChildCircle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: []
        };
    }

    componentDidMount() {
        XPress.getChilds().then(childs => {
            this.setState({array: childs})
            console.log('db return :' + childs)
        })
    }

    render() {
        return (
             this.state.array.map(circle => {
                return <ChildCircle 
                            key={circle.id} 
                            circle={circle} 
                            number={this.state.array.length} 
                        />
            })
        )
    }
}
*/
