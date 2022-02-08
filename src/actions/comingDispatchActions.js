import comingDispatchServices from "../services/comingDispatch.services";

// Return ve 1 ham. Nen duoc goi la higher order function
function getAll() {
    return (dispatch) => {
        dispatch({type: 'COMING_DISPATCH_LOADING',})
        return comingDispatchServices.getAll()
            .then((result) => {
                dispatch({
                    type: 'COMING_DISPATCH_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'COMING_DISPATCH_FAILED',
                });
            })
    }
}


function getAllDocumentType() {
    return (dispatch) => {
        dispatch({type: 'DOCUMENT_TYPE_LOADING',})
        return comingDispatchServices.getAllDocumentType()
            .then((result) => {
                dispatch({
                    type: 'DOCUMENT_TYPE_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: 'DOCUMENT_TYPE_FAILED',
                });
            })
    }
}


function getAllStorageLocation() {
    return (dispatch) => {
        dispatch({type: 'STORAGE_LOCATION_LOADING',})
        return comingDispatchServices.getAllStorageLocation()
            .then((result) => {
                dispatch({
                    type: 'STORAGE_LOCATION_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: 'STORAGE_LOCATION_FAILED',
                });
            })
    }
}

function getAllReleaseDepartment() {
    return (dispatch) => {
        dispatch({type: 'RELEASE_DEPARTMENT_LOADING',})
        return comingDispatchServices.getAllReleaseDepartment()
            .then((result) => {
                dispatch({
                    type: 'RELEASE_DEPARTMENT_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: 'RELEASE_DEPARTMENT_FAILED',
                });
            })
    }
}

function createDispatchByForm(data) {
    return () => {
        return comingDispatchServices.createDispatchByForm(data)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

const comingDispatchActions = {
    getAll,
    getAllDocumentType,
    getAllStorageLocation,
    getAllReleaseDepartment,
    createDispatchByForm,
}

export default comingDispatchActions;