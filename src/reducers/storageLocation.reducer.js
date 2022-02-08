const defaultState = {
    storageLocations : [],
    loading : false,
};

const storageLocationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'STORAGE_LOCATION_LOADED':
            return {
                ...state,
                storageLocations: action.payload,
                loading: false,
            };
        case 'STORAGE_LOCATION_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'STORAGE_LOCATION_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default storageLocationReducer;
