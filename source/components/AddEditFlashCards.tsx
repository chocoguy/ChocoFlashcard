import React from 'react'
import { Routes, Route, Link, useParams } from "react-router-dom";
import { Header } from '../Controls/Header';


export const AddEditFlashCards = () => {

    let params = useParams();

    return(
        <div>
            <Header />
            <h1>AddEditflashcards id: {params.collectionid}</h1>
        </div>
    )
}