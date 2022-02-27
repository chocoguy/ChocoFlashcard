import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { Header } from '../Controls/Header';
import { dbService } from '../db/dbService';
import { Collection } from '../db/Collection.types';
import { Flashcard } from '../db/Flashcard.types';
import { CollectionWithFlashcard } from '../db/CollectionWithFlashcard';
import { v4 as uuid, v4 } from 'uuid';
import { FlashCardComponent } from '../Controls/FlashCardComponent';
import { CollectionComponent } from '../Controls/CollectionComponent';


export const AddEditCollection =  () => {

    let navigate = useNavigate();
    let params = useParams();
    var newCollectionUUID : string = uuid();
    var isNewSet = sessionStorage.getItem("initNewSet")
    


    const [collection, setCollection] = useState<Collection>(
        {
            collectionid : '0',
            name : 'not initialized',
            flashcardcount : 0
        }
    )
    

    async function EditCollection(Collection : Collection) {
        
        setCollection({
                collectionid : Collection.collectionid,
                name : Collection.name,
                flashcardcount : Collection.flashcardcount
        })

    }


    async function deleteCollection() {
        var collectionTODelete = await dbService.deleteSingleCollection(collection);
        navigate('/')

    }
   

    async function loadCollectionToEdit(){
        //dumbass typescript
        if(params.collectionid != undefined)
        {
        //EDIT MODE
        var collectionToEdit = await dbService.getSingleCollectionById(params.collectionid)
        if(collectionToEdit != null)
        {
            
            console.log("COLLECTION to edit" + collectionToEdit)

            var currentCollection : Collection = {
                collectionid : collectionToEdit.collectionid,
                name : collectionToEdit.name,
                flashcardcount : collectionToEdit.flashcardcount
            }

            setCollection(currentCollection)

        }
        //ADD MODE
        else{
            await setCollection({
                collectionid : newCollectionUUID,
                name : 'new collection',
                flashcardcount : 0
            })

        }
        }
    }


    async function saveCollection(){

        dbService.addUpdateSingleCollection(collection)

        console.log("Updated!")
    }

    async function saveCollectionAndContinueSet(){
        dbService.addUpdateSingleCollection(collection)
        sessionStorage.setItem("currentCollectionID", newCollectionUUID)
        navigate("/addeditflashcards/-1")
    }


    async function cancel(){
       navigate('/');
    }

    async function cancelSet(){
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
                <h1>Add new SET!</h1>
                <CollectionComponent  collection={collection} passEditCollection={EditCollection} editMode={false} />
                <div className="edit-btns">
                    <button onClick={() => saveCollectionAndContinueSet()}>Next</button>
                    <button onClick={() => cancelSet()}>Cancel</button>
                </div>
            </div>
        )
    }else if(params.collectionid == "-1"){
        return (
            
            <div>
                <Header />                
                <h1>Add new collection</h1>
                <CollectionComponent  collection={collection} passEditCollection={EditCollection} editMode={false} />
                <div className="edit-btns">
                    <button onClick={() => saveCollection()}>Save Collection</button>
                    <button onClick={() => cancel()}>Cancel</button>
                </div>
            </div>
        )
    }
    else if(collection.collectionid != "0"){
    return(
        <div>
            <Header />
            <h1>Editing</h1>
            <h1>collection name: {collection.name}</h1>
            <CollectionComponent collection={collection} passEditCollection={EditCollection} editMode={false} />
                <div className="edit-btns">
                    <button onClick={() => saveCollection()}>Save Collection</button>
                    <button onClick={() => deleteCollection()}>Delete Collection</button>
                    <button onClick={() => cancel()}>Cancel</button>
                </div>
        </div>
    )
    }else {
        return(
        <div>
        <Header />
        <h1>Collection not found </h1>
        </div>
        )
    }
    return(
        <div>
            
        </div>
    )
}