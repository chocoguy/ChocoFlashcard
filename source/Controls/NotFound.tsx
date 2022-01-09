import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Header } from './Header';


export const NotFound = () => {

    return(
        <div>
            <Header />
            <h1>Page not found!</h1>
        </div>
    )
}