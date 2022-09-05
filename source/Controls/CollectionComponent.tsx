import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Flashcard } from '../db/Flashcard.types';
import { Collection } from '../db/Collection.types';

type CollectionProps = {
    collection : Collection,
    passEditCollection : Function,
    editMode : boolean
}

export const CollectionComponent = (props : CollectionProps) => {



    const [name, setName] = useState("");
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setEditMode(props.editMode)
        setName(props.collection.name)
    }, [])

    function saveChanges() {
        setEditMode(false)
        //props.flashCard.frontside = frontSideContent;
        //props.flashCard.backside = backSideContent;
        var CollectionToSend : Collection = {
            collectionid : props.collection.collectionid,
            name : name,
            flashcardcount : props.collection.flashcardcount,
        }
        props.passEditCollection(CollectionToSend);
    }

    function cancelChanges() {
        setEditMode(false)
        setName(props.collection.name)
    }

    function initEditMode() {
        setEditMode(true)
        
    }

    if(editMode == false)
    {
        return (
            <div>
                <input className='GenericTextBox' type="text" disabled value={name} />
                <button className='GenericButtonSmall' style={{background: "#99EC8C"}} onClick={() => initEditMode()}>Edit</button>
            </div>
        )
    }else{
        return (
            <div>
    
                <input className='GenericTextBox' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button className='GenericButtonSmall' style={{background: "#99EC8C"}} onClick={() => saveChanges()}>Save</button>
                <button className='GenericButtonSmall' style={{background: "#EC8C8C"}} onClick={() => cancelChanges()}>Cancel</button>
            </div>
        )
    }
}
