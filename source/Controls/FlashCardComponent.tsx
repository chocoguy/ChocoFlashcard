import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Flashcard } from '../db/Flashcard.types';

type FlashCardComponentProps = {
    flashCard : Flashcard,
    passEditFlashCard : Function,
    editMode : boolean
}

export const FlashCardComponent = (props : FlashCardComponentProps) => {



    const [frontSideContent, setFrontSideContent] = useState("");
    const [backSideContent, setBackSideContent] = useState("");
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setEditMode(props.editMode)
        setFrontSideContent(props.flashCard.frontside)
        setBackSideContent(props.flashCard.backside)
    }, [])

    function saveChanges() {
        setEditMode(false)
        //props.flashCard.frontside = frontSideContent;
        //props.flashCard.backside = backSideContent;
        var flashCardToSend : Flashcard = {
            flashcardid : props.flashCard.flashcardid,
            collectionid : props.flashCard.collectionid,
            countid : props.flashCard.countid,
            frontside : frontSideContent,
            backside : backSideContent
        }
        props.passEditFlashCard(flashCardToSend);
    }

    function cancelChanges() {
        setEditMode(false)
        setFrontSideContent(props.flashCard.frontside)
        setBackSideContent(props.flashCard.backside)
    }

    function initEditMode() {
        setEditMode(true)
        
    }

    if(editMode == false)
    {
        return (
            <div>
    
                <p>Flash card No: {props.flashCard.countid}</p>
                <input type="text" disabled value={frontSideContent} />
                <input type="text" disabled value={backSideContent}  />
                <button onClick={() => initEditMode()}>Edit</button>
            </div>
        )
    }else{
        return (
            <div>
    
                <p>Flash card No: {props.flashCard.countid}</p>
                <input type="text" value={frontSideContent} onChange={(e) => setFrontSideContent(e.target.value)} />
                <input type="text" value={backSideContent} onChange={(e) => setBackSideContent(e.target.value)} />
                <button onClick={() => saveChanges()}>Save</button>
                <button onClick={() => cancelChanges()}>Cancel</button>
            </div>
        )
    }
}
