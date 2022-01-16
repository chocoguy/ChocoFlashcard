import React from 'react'
import { Routes, Route, Link } from "react-router-dom";


export const Header = () => {

    return(

        <div>
            <nav style={{ display: 'flex',  }}>
                <p>Test build yea..</p>
                <Link to="/">Home |</Link>
                <Link to="/viewflashcards">View! |</Link>
                <Link to="/editflashcards">Edit! |</Link>
                <Link to="/deleteflashcards">Delete! |</Link>
                <Link to="/addeditflashcards/-1">Add! | </Link>
                <Link to="/addeditflashcards/543">Add2! | </Link>
                <Link to="/addeditflashcards/888705d9-15cc-427f-9b03-67a628dc8b11">Add3! | </Link>
                <Link to="/about">About! | </Link>
                <Link to="/flashcards/21">Flashcards | </Link>
                <Link to="/practice/123">Practice |</Link>
                <Link to="/notfound">Test not found</Link>
            </nav>
        </div>
    )
}