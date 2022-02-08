const defaultState = {
    releaseDepartments : [],
    loading : false,
};

const releaseDepartmentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'RELEASE_DEPARTMENT_LOADED':
            return {
                ...state,
                releaseDepartments: action.payload,
                loading: false,
            };
        case 'RELEASE_DEPARTMENT_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'RELEASE_DEPARTMENT_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default releaseDepartmentReducer;
