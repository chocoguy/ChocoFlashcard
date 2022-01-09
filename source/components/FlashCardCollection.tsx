import React from 'react'
import { Routes, Route, Link, useParams } from "react-router-dom";
import { Header } from '../Controls/Header';


export const FlashCardCollection = () => {

    let params = useParams();

    return(
        <div>
            <Header />
            <h1>Flashcard collection number: {params.collectionid}</h1>
        </div>
    )
}