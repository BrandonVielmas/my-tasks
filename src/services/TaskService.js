import axios from "axios";

const urlBase = "https://localhost:7255/api/v1/Tasks";

export class TaskService {
    
    Post(newTask) {
        return axios.post(urlBase, newTask);
    }

    Delete(idTask) {
        return axios.delete(urlBase + "/" + idTask);
    }
}