import axios from "axios";

const URL_API = "https://localhost:7255/api/v1/User";

export class UserService {

    UserLoggin(email) {
        return axios.post(`${URL_API}/loggin`, email, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}