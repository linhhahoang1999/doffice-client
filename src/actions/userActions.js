
// Return ve 1 ham. Nen duoc goi la higher order function
import userServices from "../services/user.services";

function getAllUser() {
    return (dispatch) => {
        dispatch({type: 'USER_LOADING',})
        return userServices.getAllUser()
            .then((result) => {
                dispatch({
                    type: 'USER_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'USER_FAILED',
                });
            })
    }
}

const userActions = {
    getAllUser,
}

export default userActions;