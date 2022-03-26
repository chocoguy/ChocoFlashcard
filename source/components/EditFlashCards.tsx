import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { Header } from '../Controls/Header';
import { dbService } from '../db/dbService';
import { Collection } from '../db/Collection.types';

export const EditFlashCards = () => {

    let navigate = useNavigate();
    let params = useParams();

    const [collections, setCollections] = useState<Array<Collection>>([])

    async function loadCollections(){
        var Collections = await dbService.getAllCollections();
        setCollections(Collections)
    }

    useEffect(() => {
        loadCollections();
    }, [])


    return(
        <div>
            <Header />
            <h1>Edit these flashcards</h1>
            {collections.map(collection => (
                <div key={collection.collectionid}>
                    <p>{collection.name}</p>
                    <p>{collection.flashcardcount}</p>
                    <button onClick={() =>  navigate(`/addeditflashcards/${collection.collectionid}`)}>Edit</button>
                </div>
            ))}
        </div>
    )
}