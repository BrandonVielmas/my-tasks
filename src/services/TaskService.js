import { RequestService } from "./RequestService";

export class TaskService extends RequestService {
    constructor() {
        super("Tasks");
    }
}