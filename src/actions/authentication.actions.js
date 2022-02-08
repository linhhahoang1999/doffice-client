import authenticateServices from "../services/authenticate.services";
import Cookie from "js-cookie";
import userServices from "../services/user.services";

function validateToken() {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            if (state.authentication.userLoaded) {
                return;
            }
            const response = await authenticateServices.validateToken();
            dispatch({
                type: 'AUTHENTICATION_VALIDATED',
                payload: response.data,

            });
            return response.data;

     
        } catch (e) {
            console.log(e);
            dispatch({
                type: 'AUTHENTICATION_VALIDATE_FAILED',
            });
            throw e;
        }
    };
}

function authenticate(username, password) {
    return async (dispatch) => {
        try {
            const res = await authenticateServices.authenticate(username, password);
            dispatch({
                type: 'AUTHENTICATION_LOGGED_IN',
                payload: res.userEntity,
            });
            Cookie.set('authToken', res.jwtToken);
            return res.userEntity;
        } catch (e) {
            throw e;
        }
    }
}

function getRoleOfUser(userId) {
    return (dispatch) => {
        dispatch({ type: 'USER_ROLE_LOADING', })
        return userServices.getRoleOfUser(userId)
            .then((result) => {
                dispatch({
                    type: 'USER_ROLE_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'USER_ROLE_FAILED',
                });
            })
    }
}

const authenticationActions = {
    validateToken,
    authenticate,
    getRoleOfUser,
};

export default authenticationActions;
