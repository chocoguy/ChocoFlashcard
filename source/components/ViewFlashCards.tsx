import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { Header } from '../Controls/Header';
import { dbService } from '../db/dbService';
import { Collection } from '../db/Collection.types';


export const ViewFlashCards = () => {

    let navigate = useNavigate();
    let params = useParams();

    const [collections, setCollections] = useState<Array<Collection>>([])

    async function loadCollections(){
        var Collections = await dbService.getAllCollections();
        setCollections(Collections)
        console.log(Collections)
    }

    

    useEffect(() => {
        loadCollections();
    }, [])

    return(
        <div>
            <Header title='' />
            <h1>View flashcards</h1>
            {collections.map(collection => (
                <div key={collection.collectionid}>
                    <p>{collection.name}</p>
                    <p>{collection.flashcardcount}</p>
                    <button onClick={() => navigate(`/flashcards/${collection.collectionid}`)}>View</button>
                </div>
            ))}
        </div>
    )
}