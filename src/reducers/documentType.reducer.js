const defaultState = {
    documentTypes : [],
    loading : false,
};

const documentTypeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'DOCUMENT_TYPE_LOADED':
            return {
                ...state,
                documentTypes: action.payload,
                loading: false,
            };
        case 'DOCUMENT_TYPE_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'DOCUMENT_TYPE_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default documentTypeReducer;
