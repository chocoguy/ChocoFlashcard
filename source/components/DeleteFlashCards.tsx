import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { Header } from '../Controls/Header';
import { dbService } from '../db/dbService';
import { Collection } from '../db/Collection.types';

export const DeleteFlashCards = () => {

    let navigate = useNavigate();
    let params = useParams();

    const [collections, setCollections] = useState<Array<Collection>>([])

    async function loadCollections() {
        var Collections = await dbService.getAllCollections();
        setCollections(Collections)
    }

    async function deleteCollection(collectionId : string){
        var results = await dbService.deleteSingleCollectionByCollectionId(collectionId)
    }

    useEffect(() => {
        loadCollections();
    }, [])



    return(
        <div>
            <Header />
            <h1>Delete these flashcards</h1>
            <h3>Entire collection With flashcards will be deleted</h3>
            {collections.map(collection => (
                <div key={collection.collectionid}>
                    <p>{collection.name}</p>
                    <p>{collection.flashcardcount}</p>
                    <button onClick={() => deleteCollection(collection.collectionid)}>Delete</button>
                    <button onClick={() => navigate(`addeditflashcards/${collection.collectionid}`)}>Delete Individual cards</button>
                </div>
            ))}
        </div>
    )
}