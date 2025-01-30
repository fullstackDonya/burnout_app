const initialState = {
    message: '',
    type: ''
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                ...state,
                message: action.payload.message,
                type: action.payload.type
            };
        case 'CLEAR_NOTIFICATION':
            return initialState;
        default:
            return state;
    }
};

// Action creators
export const setNotification = (message, type) => {
    return {
        type: 'SET_NOTIFICATION',
        payload: { message, type }
    };
};

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    };
};

export default notificationReducer;