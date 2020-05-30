const selectedCircleReducer = (state = {}, action) => {
    switch(action.type){
        case 'SELECTED_CIRCLE' :
            return state = action.propsCircle;
        default:
            return state;
    };
};

export default selectedCircleReducer;