const sessionReducer = (state = {}, action) => {
    switch(action.type){
        case 'SESSION' :
            return state = action.session;          
        default:
            return state;
    };
};

export default sessionReducer;