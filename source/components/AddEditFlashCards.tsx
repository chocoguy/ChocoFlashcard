import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams } from "react-router-dom";
import { Header } from '../Controls/Header';
import { dbService } from '../db/dbService';
import { Collection } from '../db/Collection.types';
import { Flashcard } from '../db/flashcard.types';
import { AddEditCollection } from '../db/addeditcollection.types';
import { v4 as uuid, v4 } from 'uuid';
import { FlashCardComponent } from '../Controls/FlashCardComponent';


export const AddEditFlashCards =  () => {

    let params = useParams();
    var MainFlashCardArray : Array<Flashcard> = []
    var newCollectionUUID : string = uuid();
    
    const [collection, setCollection] = useState<AddEditCollection>(
        {
            collectionid : '0',
            name : 'not initialized',
            flashCardCount : 0,
            flashcards : []
        }
    )
    
    const [displayFlashCardArray, setDisplayFlashCardArray] = useState<Array<Flashcard>>([])
    //const [flashCardEdited, setFlashCardEdited] = useState<Flashcard>()

    async function EditFlashCard(Flashcard : Flashcard) {
        if(MainFlashCardArray.find(element => element = Flashcard)){
            var index = MainFlashCardArray.findIndex(element => element = Flashcard);
            MainFlashCardArray[index].frontSide = Flashcard.frontSide
            MainFlashCardArray[index].backSide = Flashcard.backSide
        }else{
            MainFlashCardArray.push(Flashcard);
        }
    }

    
    function initNewFlashCard(){
        var newFlashCard : Flashcard = {
            flashcardid : "$" + uuid(),
            collectionid : collection.collectionid,
            countId : 0,
            frontSide : "",
            backSide : ""
        } 
        MainFlashCardArray.push(newFlashCard)
        
        setDisplayFlashCardArray(MainFlashCardArray)
        console.log(MainFlashCardArray)
        
    }



    async function loadCollectionToEdit(){
        //dumbass typescript
        if(params.collectionid != undefined)
        {
        var collectionToEdit = await dbService.getSingleCollectionById(params.collectionid)
        if(collectionToEdit != null)
        {
            console.log(collectionToEdit)
            setCollection(collectionToEdit)
            MainFlashCardArray = collection.flashcards
            await setDisplayFlashCardArray(collection.flashcards)
        }
        else{
            await setCollection({
                collectionid : newCollectionUUID,
                name : 'new collection',
                flashCardCount : 0,
                flashcards :  []
            })
            MainFlashCardArray = collection.flashcards;
            await setDisplayFlashCardArray(collection.flashcards)
        }
        console.log(MainFlashCardArray)
        console.log(displayFlashCardArray)
        }
    }

    useEffect(() => {
        loadCollectionToEdit();
    }, [])

   // useEffect(() => loadCollectionToEdit(), [collection])




    if(params.collectionid == "-1"){


        return (
            
            <div>
                <Header />                
                <h1>Add new cards</h1>
                {displayFlashCardArray.map(flashcard => (
                    <div key={flashcard.flashcardid}>
                    <FlashCardComponent  flashCard={flashcard} passEditFlashCard={EditFlashCard} editMode={false} />
                    </div>
                ))}
                <div className="edit-btns">
                    <button onClick={() => initNewFlashCard()}>New Flashcard</button>
                </div>
            </div>
        )
    }else if(collection.collectionid != "0"){
    return(
        <div>
            <Header />
            <h1>Editing</h1>
            <h1>collection name: {collection.name}</h1>
            {displayFlashCardArray.map(flashcard => (
                    <div key={flashcard.flashcardid}>
                    <FlashCardComponent  flashCard={flashcard} passEditFlashCard={EditFlashCard} editMode={false} />
                    </div>
                ))}
                <div className="edit-btns">
                    <button onClick={() => initNewFlashCard()}>New Flashcard</button>
                </div>
        </div>
    )
    }else {
        return(
        <div>
        <Header />
        <h1>Collection not found  </h1>
        </div>
        )
    }
    return(
        <div>
            
        </div>
    )
}