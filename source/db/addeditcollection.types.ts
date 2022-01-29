import { Flashcard } from "./flashcard.types";

export type AddEditCollection = {
    collectionid : string,
    name : string,
    flashCardCount : number
    flashcards : Array<Flashcard>
}