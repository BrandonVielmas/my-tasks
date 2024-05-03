import axios from "axios";

const urlBase = "https://localhost:7255/api/v1/Columns";

export class ColumnService {
    
    GetAll() {
        return axios.get(urlBase);
    }
}