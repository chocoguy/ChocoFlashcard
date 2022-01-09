
import { v4 as uuidv4 } from 'uuid';

export class flashcards{
    id : string = "";
    flashcardcollectionid : string = "";
    countid : number = 0;
    frontside : string = "";
    backside : string = "";

    constructor(id : string, flashcardcollectionid : string, countid : number, frontside : string, backside : string) {
        this.id = id == null ? uuidv4() : id
        this.flashcardcollectionid = id == null ? "0" : flashcardcollectionid
        this.countid = id == null ? 0 : countid
        this.frontside = frontside == null ? "no frontside" : frontside
        this.backside = backside == null ? "no backside" : backside

    }


}