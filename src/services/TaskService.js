import { RequestService } from "./RequestService";
import axios from "axios";

const URL_API = "https://localhost:7255/api/v1/";

export class TaskService extends RequestService {
    constructor() {
        super("Tasks");
    }

    UpdateTaskOfColumn(idTask, idColumn) {
        let urlEndPoint = `${URL_API}Tasks/update-task-of-column?idTask=${idTask}&idColumn=${idColumn}`;
        return axios.put(urlEndPoint);
    }
}