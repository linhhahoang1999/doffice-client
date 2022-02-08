import {get, post} from './sender';

const validateToken = () => get('/validate-token');

const authenticate = (username, password) => post('/authenticate', { username, password });

const authenticateServices = {
    validateToken,
    authenticate,
};

export default authenticateServices;
