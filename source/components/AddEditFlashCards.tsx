import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams } from "react-router-dom";
import { Header } from '../Controls/Header';
import { dbService } from '../db/dbService';
import { Collection } from '../db/Collection.types';


export const AddEditFlashCards =  () => {

    let params = useParams();

    const [collection, setCollection] = useState<Collection>(
        {
            collectionid : '0',
            name : 'not initialized',
            flashCardCount : 0
        }
    )

    async function loadCollectionToEdit(){
        //dumbass typescript
        if(params.collectionid != undefined)
        {
        var collectionToEdit = await dbService.getSingleCollectionById(params.collectionid)
        if(collectionToEdit != null)
        {
            setCollection(collectionToEdit)
        }
        }
    }

    useEffect(() => {
        loadCollectionToEdit();
    })




    if(params.collectionid == "-1"){
        return (
            <div>
                <Header />
                <h1>Add new cards</h1>
            </div>
        )
    }else if(collection.collectionid != "0"){
    return(
        <div>
            <Header />
            <h1>Editing</h1>
            <h1>collection name: {collection.name}</h1>
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