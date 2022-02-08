const defaultState = {
    comingDispatchs : [],
    loading : false,
    editingComingDispatch : undefined,
};

const comingDispatchReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'COMING_DISPATCH_LOADED':
            return {
                ...state,
                comingDispatchs: action.payload,
                loading: false,
            };
        case 'COMING_DISPATCH_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'COMING_DISPATCH_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default comingDispatchReducer;
