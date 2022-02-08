import { get, post, put, del } from './sender';

function getRecently(userId) {
    return get(`/api/recently/${userId}`);
}

function insertRecently(data) {
    return post(`/api/recently/`, data);
}

function removeRecently(recentId) {
    return del(`/api/recently/${recentId}`);
}






const recentlyServices = {
    getRecently,
    insertRecently,
    removeRecently,
}

export default recentlyServices;