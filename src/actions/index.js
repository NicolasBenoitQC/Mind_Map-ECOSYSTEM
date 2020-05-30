export const setPropsSession = (session) => {
    return {
        type: 'SESSION',
        session
    };
};

export const selectedCircle = (propsCircle) => {
    return {
        type: 'SELECTED_CIRCLE',
        propsCircle
    };
};