import React, { Fragment } from 'react'
import { Routes, Route, Link, HashRouter} from "react-router-dom";
import { Home } from './components/Home';
import { NotFound } from './Controls/NotFound';
import { ViewFlashCards } from './components/ViewFlashCards';
import { EditFlashCards } from './components/EditFlashCards';
import { DeleteFlashCards } from './components/DeleteFlashCards';
import { AddEditFlashCards } from './components/AddEditFlashCards';
import { About } from './components/About';
import { FlashCardPractice } from './components/FlashCardPractice';
import { FlashCardCollection } from './components/FlashCardCollection';
import { AddEditCollection } from './components/AddEditCollection';
export const App = () => {

    

    return(
        <Fragment>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />}  />
                    <Route path="/viewflashcards" element={<ViewFlashCards />} />
                    <Route path="/editflashcards" element={<EditFlashCards />} />
                    <Route path="/deleteflashcards" element={<DeleteFlashCards />} />
                    <Route path="/addeditflashcards/:collectionid" element={<AddEditFlashCards />} />
                    <Route path="/addeditcollection/:collectionid" element={<AddEditCollection />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/flashcards/:collectionid" element={<FlashCardCollection />} />
                    <Route path="/practice/:collectionid" element={<FlashCardPractice />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </HashRouter>
        </Fragment>
    )
}