import React from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom";


export const Header = () => {

    let navigate = useNavigate();

    function initAddFlashCards() {
        console.log("init")
        sessionStorage.setItem("initNewSet", "yea")
        navigate("/addeditcollection/-1")
    }


    return(

        <div>
            <nav style={{ display: 'flex',  }}>
                <p>Test build yea..</p>
                <Link to="/">Home |</Link>
                <button onClick={() => initAddFlashCards()}>Add Flashcards! |</button>
                <Link to="/viewflashcards">View! |</Link>
                <Link to="/editflashcards">Edit! |</Link>
                <Link to="/deleteflashcards">Delete! |</Link>
                <Link to="/addeditflashcards/-1">Add ! | </Link>
                <Link to="/addeditcollection/-1">Add Collection! |</Link>
                <Link to="/about">About! | </Link>
                <Link to="/flashcards/21">Flashcards | </Link>
                <Link to="/practice/123">Practice |</Link>
                <Link to="/notfound">Test not found</Link>
            </nav>
        </div>
    )
}