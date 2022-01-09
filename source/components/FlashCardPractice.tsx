import React from 'react'
import { Routes, Route, Link, useParams } from "react-router-dom";
import { Header } from '../Controls/Header';


export const FlashCardPractice = () => {


    let params = useParams();

    return(
        <div>
            <Header />
            <h1>Flash card practice on collection: {params.collectionid}</h1>
        </div>
    )
}