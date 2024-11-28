import axios from "axios";

const URL_API = "https://localhost:7255/api/v1/User";

export class UserService {

    UserLoggin(body) {
        return axios.post(`${URL_API}/loggin`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}