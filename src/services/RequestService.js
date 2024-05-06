import axios from "axios";

const URL_API = "https://localhost:7255/api/v1/";

export class RequestService {
    constructor(endpoint) {
        this.URL_ENDPOINT = `${URL_API}${endpoint}`;
    }

    GetAll() {
        return axios.get(this.URL_ENDPOINT);
    }

    Post(body) {
        return axios.post(this.URL_ENDPOINT, body);
    }

    DeleteById(id) {
        return axios.delete(`${this.URL_ENDPOINT}/${id}`);
    }
}