import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { Header } from '../Controls/Header';
import { dbService } from '../db/dbService';
import { Collection } from '../db/Collection.types';
import { Flashcard } from '../db/Flashcard.types';
import { CollectionWithFlashcard } from '../db/CollectionWithFlashcard';
import { v4 as uuid, v4 } from 'uuid';
import { FlashCardComponent } from '../Controls/FlashCardComponent';


export const AddEditFlashCards =  () => {

    let navigate = useNavigate();
    let params = useParams();
    var MainFlashCardArray : Array<Flashcard> = []
    var newCollectionUUID : string = uuid();
    var currentSetCollectionID = sessionStorage.getItem("currentCollectionID")
    var isNewSet = sessionStorage.getItem("initNewSet");

    

    //--------------------------------------------- COLLECTIONWITHFLASHCARD COLLECTION ----------------------------------
    const [collection, setCollection] = useState<CollectionWithFlashcard>(
        {
            collectionid : '0',
            name : 'not initialized',
            flashCardCount : 0,
            flashcards : []
        }
    )
    
    //const [displayFlashCardArray, setDisplayFlashCardArray] = useState<Array<Flashcard>>([])
    //const [flashCardEdited, setFlashCardEdited] = useState<Flashcard>()

    async function EditFlashCard(Flashcard : Flashcard) {
        if(collection.flashcards.find(element => element.flashcardid == Flashcard.flashcardid)){            
            var flashCardsToUpdate : Array<Flashcard> = collection.flashcards;

            var index = flashCardsToUpdate.findIndex(element => element.flashcardid == Flashcard.flashcardid);

            flashCardsToUpdate[index].frontside = Flashcard.frontside;
            flashCardsToUpdate[index].backside = Flashcard.backside;


            // let EditedFlashCard : Flashcard = collection.flashcards[index]
            // EditedFlashCard.frontside = Flashcard.frontside
            // EditedFlashCard.backside = Flashcard.backside
            

            // collection.flashcards[index].frontside = Flashcard.frontside
            // collection.flashcards[index].backside = Flashcard.backside


            setCollection({
                collectionid : collection.collectionid,
                name : collection.name,
                flashCardCount : collection.flashCardCount,
                flashcards : flashCardsToUpdate
            })

        }else{
            const newEditedFlashCards = [...collection.flashcards, Flashcard] 
            setCollection({
                collectionid : collection.collectionid,
                name : collection.name,
                flashCardCount : collection.flashCardCount,
                flashcards : newEditedFlashCards
            })
            //MainFlashCardArray.push(Flashcard);
        }
    }

    async function PassDeleteFlashCard(Flashcard : Flashcard) {
        var flashCardsToDelete : Array<Flashcard> = collection.flashcards;

        var index = flashCardsToDelete.findIndex(element => element.flashcardid == Flashcard.flashcardid);

        flashCardsToDelete.splice(index, 1);

        setCollection({
            collectionid : collection.collectionid,
            name : collection.name,
            flashCardCount : collection.flashCardCount,
            flashcards : flashCardsToDelete
        })

    }

    
    function initNewFlashCard(){
        var newFlashCard : Flashcard = {
            flashcardid : "$" + uuid(),
            collectionid : collection.collectionid,
            countid : 0,
            frontside : "",
            backside : ""
        } 

        const updatedCollectionFlashcardList = [...collection.flashcards, newFlashCard]

        setCollection({
            collectionid : collection.collectionid,
            name : collection.name,
            flashCardCount : collection.flashCardCount,
            flashcards : updatedCollectionFlashcardList
        })

        //MainFlashCardArray.push(newFlashCard)
        
        //setDisplayFlashCardArray(MainFlashCardArray)
        //console.log(MainFlashCardArray)
        
    }



    async function loadCollectionToEdit(){
        //dumbass typescript
        if(params.collectionid != undefined)
        {
        //EDIT MODE
        var collectionToEdit = await dbService.getSingleCollectionById(params.collectionid)
        if(collectionToEdit != null)
        {
            var currentCollectionFlashCards = await dbService.getFlashcardsByCollectionId(params.collectionid)
            console.log("COLLECTION to edit" + collectionToEdit)
            console.log("CurrentcollectionFlashCards" + currentCollectionFlashCards)


            var currentCollectionWithFlashcardObject : CollectionWithFlashcard = {
                collectionid : collectionToEdit.collectionid,
                name : collectionToEdit.name,
                flashCardCount : collectionToEdit.flashcardcount,
                flashcards : currentCollectionFlashCards
            }

            setCollection(currentCollectionWithFlashcardObject)
            //MainFlashCardArray = collection.flashcards
        }
        //ADD MODE
        else{

            if(isNewSet == "yea"){
                await setCollection({
                    //typescript being a dumbass
                    collectionid : currentSetCollectionID,
                    name : 'new collection',
                    flashCardCount : 0,
                    flashcards :  []
                })
            }else{
                await setCollection({
                    collectionid : newCollectionUUID,
                    name : 'new collection',
                    flashCardCount : 0,
                    flashcards :  []
                })
            }

            MainFlashCardArray = collection.flashcards;
            //await setDisplayFlashCardArray(collection.flashcards)
        }
        console.log(MainFlashCardArray)
        }
    }


    async function saveAll(){
        var newFlashCardCount : number = 1;
        var updatedCollectionObj : Collection = {
            collectionid : collection.collectionid,
            name : collection.name,
            flashcardcount : collection.flashCardCount
        }

        var updatedFlashCardArray : Array<Flashcard> = collection.flashcards

        for( let i = 0; i < updatedFlashCardArray.length; i++) {
            updatedFlashCardArray[i].countid = newFlashCardCount
            newFlashCardCount = newFlashCardCount + 1
        }
        console.log(updatedCollectionObj)
        console.log(updatedFlashCardArray)
        dbService.updateCollectionAndFlashCards(updatedCollectionObj, updatedFlashCardArray);

        navigate('/')
    }


    async function cancel(){
       navigate('/');
    }

    async function cancelSet(){
        var collectionToDelete : Collection = {
            collectionid : collection.collectionid,
            name : collection.name,
            flashcardcount : collection.flashCardCount
        }
        dbService.deleteSingleCollection(collectionToDelete)
        sessionStorage.removeItem("currentCollectionID")
        sessionStorage.removeItem("initNewSet")
        navigate('/');
    }


    useEffect(() => {
        loadCollectionToEdit();
    }, [])

   // useEffect(() => loadCollectionToEdit(), [collection])




    if(params.collectionid == "-1" && isNewSet == "yea"){


        return (
            
            <div>
                <Header />                
                <h1>Add new cards</h1>
                {collection.flashcards.map(flashcard => (
                    <div key={flashcard.flashcardid}>
                    <FlashCardComponent  flashCard={flashcard} passEditFlashCard={EditFlashCard} passDeleteFlashCard={PassDeleteFlashCard} editMode={false} />
                    </div>
                ))}
                <div className="edit-btns">
                    <button onClick={() => initNewFlashCard()}>New Flashcard</button>
                    <button onClick={() => saveAll()}>Save all</button>
                    <button onClick={() => cancelSet()}>Cancel</button>
                </div>
            </div>
        )
    }else if(params.collectionid == "-1"){


        return (
            
            <div>
                <Header />                
                <h1>Add new cards</h1>
                {collection.flashcards.map(flashcard => (
                    <div key={flashcard.flashcardid}>
                    <FlashCardComponent  flashCard={flashcard} passEditFlashCard={EditFlashCard} passDeleteFlashCard={PassDeleteFlashCard} editMode={false} />
                    </div>
                ))}
                <div className="edit-btns">
                    <button onClick={() => initNewFlashCard()}>New Flashcard</button>
                    <button onClick={() => saveAll()}>Save all</button>
                    <button onClick={() => cancel()}>Cancel</button>
                </div>
            </div>
        )
    }else if(collection.collectionid != "0"){
    return(
        <div>
            <Header />
            <h1>Editing</h1>
            <h1>collection name: {collection.name}</h1>
            {collection.flashcards.map(flashcard => (
                    <div key={flashcard.flashcardid}>
                    <FlashCardComponent  flashCard={flashcard} passEditFlashCard={EditFlashCard} passDeleteFlashCard={PassDeleteFlashCard} editMode={false} />
                    </div>
                ))}
                <div className="edit-btns">
                    <button onClick={() => initNewFlashCard()}>New Flashcard</button>
                    <button onClick={() => saveAll()}>Save all</button>
                    <button onClick={() => cancel()}>Cancel</button>
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