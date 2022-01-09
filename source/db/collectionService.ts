import { baseService } from "./baseService";

export class collectionService extends baseService {

    constructor() {
        super();
        //this.tableName = "flashcardcollection";
    }

    getAllCollections() {
        return this.connection.select({
            from: "flashcardcollection",
        });
    }

    addCollection(collection : any) {
        return this.connection.insert({
            into : "flashcardcollection",
            values : [collection],
            return : true
        })
    }


}