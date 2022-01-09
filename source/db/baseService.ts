import { dbConnection } from "./dbService";

export class baseService {

    get connection() {
        return dbConnection;
    }
}