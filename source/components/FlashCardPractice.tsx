import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { Header } from '../Controls/Header';
import { dbService } from '../db/dbService';
import { Flashcard } from '../db/Flashcard.types';

//Adding a new collectionW/ flashcards is done, focus on practicing the flashcards
export const FlashCardPractice = () => {

    let navigate = useNavigate();
    let params = useParams();
    let randomFlashcardCounterArray : Array<number> = []
    let linearFlashCardCounterArray : Array<number> = []
    let baseFlashCardCounterArray : Array<number> = [] 
    let indexNumber = 0
    //let frontbackMarker = true


    const [flashcards, setFlashcards] = useState<Array<Flashcard>>([])
    const [cardText, setCardText] = useState<Flashcard>({
        flashcardid: "",
        collectionid: "",
        countid: 0,
        frontside: "",
        backside: ""
    });
    const [frontBackMarker, setFrontBackMarker] = useState(true);
    const [randFlashCardArray, setRandFlashCardArray] = useState<Array<number>>([])
    const [indxNum, setIndxNum] = useState(0);

    async function loadPractice(){
        if(params.collectionid != undefined && params.mode != undefined){
            var flashcardsToPractice = await dbService.getFlashcardsByCollectionId(params.collectionid)
            setFlashcards(flashcardsToPractice);

            console.log(flashcardsToPractice)

            for (let i = 0; i < flashcardsToPractice.length; i++) {
                linearFlashCardCounterArray.push(i);
                baseFlashCardCounterArray.push(i)
            }

            if(params.mode == "0"){
                console.log("Random practice")
                for (let i = 0; i < baseFlashCardCounterArray.length; i++) {
                    var randomFlashcardIndex = Math.floor(Math.random() * Math.floor(linearFlashCardCounterArray.length))
                    randomFlashcardCounterArray.push(linearFlashCardCounterArray[randomFlashcardIndex])
                    linearFlashCardCounterArray.splice(randomFlashcardIndex, 1)


                }
                setCardText(flashcardsToPractice[randomFlashcardCounterArray[indexNumber]])
                setRandFlashCardArray(randomFlashcardCounterArray)
                //cardText = flashcards[randomFlashcardCounterArray[indexNumber]]
            }else{
                console.log("linear practice")
                for (let i = 0; i < baseFlashCardCounterArray.length; i++) {
                    randomFlashcardCounterArray.push(linearFlashCardCounterArray[i])
                    console.log(randomFlashcardCounterArray)

                }
                console.log(randomFlashcardCounterArray[0])
                setCardText(flashcardsToPractice[randomFlashcardCounterArray[0]])
                setRandFlashCardArray(randomFlashcardCounterArray)
                //cardText = flashcardsToPractice[randomFlashcardCounterArray[indexNumber]]
                //cardText = flashcardsToPractice[1]
                console.log(cardText)
            }

        }
    }

    function flipFlashcard(){
        //frontbackMarker = !frontbackMarker
        setFrontBackMarker(!frontBackMarker);
    }

    async function skipFlashcard(){
        if (indxNum + 2 >  randFlashCardArray.length){
            console.log("too high inc")
            console.log(indxNum + 1)
            return
        }else {
            setIndxNum(indxNum + 1)
            //setCardText(flashcards[randFlashCardArray[indxNum]])
           // cardText = flashcards[randomFlashcardCounterArray[indexNumber]]
        }
    }

    async function setFlashcardText() {
        console.log(randFlashCardArray)
        console.log(indxNum)
        if(randFlashCardArray.length > 0){
        await setCardText(flashcards[randFlashCardArray[indxNum]])
        }
    }

    async function backFlashcard(){
        if(indxNum == 0){
            console.log("too low")
            console.log(indxNum)
            console.log(flashcards[randFlashCardArray[indxNum]])
            return
        }
        // else if (indxNum - 1 < 0){
        //     console.log("too low 1")
        //     console.log(indxNum)
        //     console.log(flashcards[randFlashCardArray[indxNum]])
        //     return
        // }
        else{
            setIndxNum(indxNum - 1)
            //setCardText(flashcards[randFlashCardArray[indxNum]])
            //cardText = flashcards[randomFlashcardCounterArray[indexNumber]]
        }
    }

    async function exit(){
        navigate('/')
    }

    useEffect(() => {
        console.log(indxNum)
        setFlashcardText();
    }, [indxNum])

    useEffect(() => {
        loadPractice();
    }, [])








    return(
        <div>
            <Header title='- Collection' />
            <h1>Flash card practice on collection: {params.collectionid}</h1>
            <h3>{indxNum + 1}/{flashcards.length} Cards</h3>
            <br />
            {frontBackMarker ? <h5>{cardText.frontside}</h5> : <h5>{cardText.backside}</h5> }

            <div className="edit-btns">
                <button onClick={() => flipFlashcard()}>Flip</button>
                <button onClick={() => skipFlashcard()}>Skip</button>
                <button onClick={() => backFlashcard()}>Back</button>
                <button onClick={() => navigate('/')}>Exit</button>
            </div>
            
        </div>
    )
}