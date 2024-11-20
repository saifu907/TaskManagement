import { commonAPI } from './commonAPI';
import { SERVER_URL } from './serverUrl';

export const getTasks=async (searchKey)=>{
    return await commonAPI('GET',`${SERVER_URL}/api/tasks?search=${searchKey}`,'','');
}
export const createTask=async (task)=>{
    return await commonAPI('POST',`${SERVER_URL}/api/tasks`,task,'');
}
export const updateTask=async (id, task)=>{
    return await commonAPI('PUT',`${SERVER_URL}/api/tasks/${id}`,task,'');
}
export const getTask =async (id)=>{
    return await commonAPI('GET',`${SERVER_URL}/api/tasks/${id}`,'','');
}
export const deleteTask=async (id)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/api/tasks/${id}`);
}