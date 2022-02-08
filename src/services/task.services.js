import {get, post,del,put} from './sender';

function getAll() {
    return get('/api/task');
}

function searchTask(searchPharase) {
    return get(`/api/task/search/${searchPharase}`);
    }

function getTaskById(taskId) {
    return get(`/api/task/${taskId}`);
    
}
function getTaskHistory(taskId) {
    return get(`/api/task/history/${taskId}`);
    
}

function getAssignByTaskId(taskId) {
    return get(`/api/task/assign/${taskId}`);
}


function getTaskByUser(userId) {
    return get(`/api/task/user/${userId}`);
}

function getTaskByWorkId(workId) {
    return get(`/api/task/work/${workId}`);
}

function createTaskByForm(data) {
    return post(`/api/task`,data);
}

function insertTaskAssign(taskId,userId) {
    return post(`/api/task/assign/taskId=${taskId}/userId=${userId}`);
}

function removeTaskAssign(taskId,userId) {
    return del(`/api/task/assign/taskId=${taskId}/userId=${userId}`);
}

function updateTask(taskId,data){
    return put(`/api/task/${taskId}`,data);

}
function deleteTask(taskId) {
    return del(`/api/task/${taskId}`);
    
}



const taskServices = {
    getAll,
    getTaskById,
    createTaskByForm,
    getTaskByWorkId,
    getAssignByTaskId,
    insertTaskAssign,
    removeTaskAssign,
    getTaskByUser,
    updateTask,
    searchTask,
    deleteTask,
    getTaskHistory,
}

export default taskServices;