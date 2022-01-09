import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Header } from '../Controls/Header';
import  Cole  from '../public/assets/cole.jpg';

export const Home = () => {

    return(
        <div>
            <Header />
            <h1>DB Methods Testtttt</h1>
            <br />
            <hr />
            <h1>J Coleslaw</h1>
            <img src={Cole} alt="J Cole" title="J cole (lol)" />
            <h1>J coleslaw</h1>

        </div>
    )
}