import axios from "axios";

const URL_API = "https://localhost:7255/api/v1/Board";

export class BoardService {

    GetBoardByUserId(boardId, userId) {
        const urlEndpoint = `${URL_API}/board-by-userId?boardId=${boardId}&userId=${userId}`;

        return axios.get(urlEndpoint);
    }

}