import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Flashcard } from '../db/Flashcard.types';

type FlashCardComponentProps = {
    flashCard : Flashcard,
    passEditFlashCard : Function,
    passDeleteFlashCard : Function,
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

    function deleteFlashCard() {
        setEditMode(false)
        props.passDeleteFlashCard(props.flashCard)

    }

    function initEditMode() {
        setEditMode(true)
        
    }

    if(editMode == false)
    {
        return (
            <div>
    
                <p>Flash card No: {props.flashCard.countid}</p>
                <p>Front side:</p><input className='GenericTextBox' type="text" disabled value={frontSideContent} />
                <br />
                <p>Back side:</p><input className='GenericTextBox' type="text" disabled value={backSideContent}  />
                <br />
                <button className='GenericButtonSmall' style={{background: "#99EC8C"}} onClick={() => initEditMode()}>Edit</button>
                <button className='GenericButtonSmall' style={{background: "#EC8C8C"}} onClick={() => deleteFlashCard()}>Delete</button>
            </div>
        )
    }else{
        return (
            <div>
    
                <p>Flash card No: {props.flashCard.countid}</p>
                <p>Front side:</p><input className='GenericTextBox' type="text" value={frontSideContent} onChange={(e) => setFrontSideContent(e.target.value)} />
                <br />
                <p>Back side:</p><input className='GenericTextBox' type="text" value={backSideContent} onChange={(e) => setBackSideContent(e.target.value)} />
                <br />
                <button className='GenericButtonSmall' style={{background: "#99EC8C"}} onClick={() => saveChanges()}>Save</button>
                <button className='GenericButtonSmall' style={{background: "#EC8C8C"}} onClick={() => cancelChanges()}>Cancel</button>
                <button className='GenericButtonSmall' style={{background: "#EC8C8C"}} onClick={() => deleteFlashCard()}>Delete</button>
            </div>
        )
    }
}
