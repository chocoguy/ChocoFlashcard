import React from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom";

type HeaderProps = {
    title : string
}

export const Header = (props : HeaderProps) => {


    return(

        <div className='MainHeader'>
            <nav>
               <p style={{textAlign: 'center'}}>ChocoFlashcard {props.title}</p>
            </nav>
        </div>
    )
}