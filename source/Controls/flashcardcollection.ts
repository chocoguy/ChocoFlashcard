import { v4 as uuidv4 } from 'uuid';


export class flashcardcollection {
    id : string = "";
    name : string = "";
    flashcardcount : number = 0;

    constructor(id : string, name : string, flashcardcount : number) {
        this.id = id == null ?  uuidv4(): id
        this.name = name == null ? "No name" : name
        this.flashcardcount = flashcardcount == null ? 0 : flashcardcount
    }


}