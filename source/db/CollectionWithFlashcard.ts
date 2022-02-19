import { Flashcard } from "./Flashcard.types";

export type CollectionWithFlashcard = {
    collectionid : string,
    name : string,
    flashCardCount : number
    flashcards : Array<Flashcard>
}