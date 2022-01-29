import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Flashcard } from '../db/flashcard.types';

type FlashCardComponentProps = {
    flashCard : Flashcard,
    passEditFlashCard : Function,
    editMode : boolean
}

export const FlashCardComponent = (props : FlashCardComponentProps) => {

    const [frontSideContent, setFrontSideContent] = useState("");
    const [backSideContent, setBackSideContent] = useState("");

    useEffect(() => {
        setFrontSideContent(props.flashCard.frontSide)
        setBackSideContent(props.flashCard.backSide)
    }, [])

    function saveChanges() {
        props.editMode = false;
        props.flashCard.frontSide = frontSideContent;
        props.flashCard.backSide = backSideContent;
        props.passEditFlashCard(props.flashCard);
    }

    function cancelChanges() {
        props.editMode = false;
        setFrontSideContent(props.flashCard.frontSide)
        setBackSideContent(props.flashCard.backSide)
    }

    if(props.editMode == false)
    {
        return (
            <div>
    
                <p>Flash card No: {props.flashCard.countId}</p>
                <input type="text" disabled value={frontSideContent} />
                <input type="text" disabled value={backSideContent}  />
                <button onClick={() => props.editMode = true}>Edit</button>
            </div>
        )
    }else{
        return (
            <div>
    
                <p>Flash card No: {props.flashCard.countId}</p>
                <input type="text" value={frontSideContent} onChange={(e) => setFrontSideContent(e.target.value)} />
                <input type="text" value={backSideContent} onChange={(e) => setBackSideContent(e.target.value)} />
                <button onClick={() => saveChanges()}>Save</button>
                <button onClick={() => cancelChanges()}>Cancel</button>
            </div>
        )
    }
}
