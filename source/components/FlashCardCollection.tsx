import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { Header } from '../Controls/Header';
import { dbService } from '../db/dbService';
import { Collection } from '../db/Collection.types';
import { Flashcard } from '../db/Flashcard.types';
import { CollectionWithFlashcard } from '../db/CollectionWithFlashcard';


export const FlashCardCollection = () => {

    let navigate = useNavigate();
    let params = useParams();

    const [collection, setCollection] = useState<CollectionWithFlashcard>(
        {
            collectionid : '0',
            name : 'not initialized',
            flashCardCount : 0,
            flashcards : []
        }
    )


    async function loadCollection(){
        if(params.collectionid != undefined)
        {
        var collectionToView = await dbService.getSingleCollectionById(params.collectionid)
        var flashcardsToView = await dbService.getFlashcardsByCollectionId(params.collectionid)
        console.log(collectionToView)
        
        var currentCollectionWithFlashcardObject : CollectionWithFlashcard = {
            collectionid : collectionToView.collectionid,
            name : collectionToView.name,
            flashCardCount : collectionToView.flashcardcount,
            flashcards : flashcardsToView
        }
        setCollection(currentCollectionWithFlashcardObject)
        }
    }

    useEffect(() => {
        loadCollection();
    }, [])



    return(
        <div>
            <Header />
            <p>Name: {collection.name}</p>
            <p>{collection.flashCardCount} Cards</p>
            {collection.flashcards.map(flashcard => (
                <div key={flashcard.flashcardid}>
                    <p>Card: {flashcard.countid}</p>
                    <p>Front: {flashcard.frontside}</p>
                    <p>Back: {flashcard.backside}</p>
                </div>
            ))}
            <div className="edit-btns">
                <button onClick={() => navigate(`/practice/${collection.collectionid}/1`)}>Practice - Linear</button>
                <button onClick={() => navigate(`/practice/${collection.collectionid}/0`)}>Practice - Random</button>
            </div>
        </div>
    )
}