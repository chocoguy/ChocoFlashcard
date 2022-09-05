import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Header } from '../Controls/Header';
import  Cole  from '../public/assets/cole.jpg';
import { dbService } from '../db/dbService';
import { Collection } from '../db/Collection.types';
import { v4 as uuid } from 'uuid';
import { Flashcard } from '../db/Flashcard.types';
import { CollectionWithFlashcard } from '../db/CollectionWithFlashcard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  HomeSvg  from '../public/assets/house-solid.svg';
import QuestionSvg from '../public/assets/circle-question-solid.svg';


export const Home = () => {


    let navigate = useNavigate();

     useEffect(() => {
        initTables();    
     }, [])

    async function initTables() {
        await dbService.initTables();

    }

    function initAddFlashCards(){
        sessionStorage.setItem("initNewSet", "yea")
        navigate("/addeditcollection/-1")
    }

    return(
        <>
        <Header title="" />
        <div className="Home">
            <div className="AddFlashCardDiv">
                <button className="HomeBtn" style={{background: "#99EC8C"}} onClick={() => initAddFlashCards()}>Add Flashcards!</button>
            </div>
            <div>
                <button className="HomeBtn" style={{background: "#8CD5EC"}} onClick={() => navigate("/viewflashcards")}>View!</button>
            </div>
            <div>
                <button className="HomeBtn" style={{background: "#ECE88C"}} onClick={() => navigate("/editflashcards")}>Edit!</button>
            </div>
            <div>
                <button className="HomeBtn" style={{background: "#EC8C8C"}} onClick={() => navigate("/deleteflashcards")}>Delete!</button>
            </div>
            <div>
                <button className="HomeBtn" style={{background: "#AA8CEC"}} onClick={() => navigate("/about")}>About!</button>
            </div>
        
        </div>
        <div className='MainFooter'>
            <div className='MainFooterFlex'>
                <div>
                <img width={30} height={30}  src={HomeSvg} />
                </div>
                <div>
                <img width={30} height={30} src={QuestionSvg} />
                </div>
            </div>
        </div>
        </>
    )
}

