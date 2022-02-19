import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Header } from '../Controls/Header';
import  Cole  from '../public/assets/cole.jpg';
import { dbService } from '../db/dbService';
import { Collection } from '../db/Collection.types';
import { v4 as uuid } from 'uuid';
import { Flashcard } from '../db/Flashcard.types';
import { CollectionWithFlashcard } from '../db/CollectionWithFlashcard';



export const Home = () => {

    type collectionStateType = {
        collection : Array<Collection>,
        testString : string
    }

    const [collections, setCollections] = useState<collectionStateType>(
        {
            collection : [],
            testString : "coffee"
        }
    )

    const [count, setCount] = useState(0);
    const [collectionName, setCollectionName] = useState("");
    const [collectionCount, setCollectionCount] = useState(0);
    
 
    

    
     useEffect(() => {
        //setCount(4);    
     })

    async function loadCollections() {
           await setCollections({ 
                collection : [],
                testString : "choco" 
            })
            await setCount(count + 1);
            dbService.initTables();

    }

    async function addCollection(){

        var collectionObj : Collection = {
            collectionid : uuid(),
            name : collectionName,
            flashcardcount : collectionCount
        }

        dbService.insertSingleCollection(collectionObj);

        console.log("ADD")




    }

    async function getCollectionWFlashcards() {
       var collection1 = await dbService.getSingleCollectionById("af3cd638-2c6f-48ef-8c83-794a7a527d52");
       var flashcards1 = await dbService.getFlashcardsByCollectionId("af3cd638-2c6f-48ef-8c83-794a7a527d52");

       //console.log(collection1);
      //console.log(flashcards1);

      var collWFlashCards : CollectionWithFlashcard = {
          collectionid : collection1.collectionid,
          name : collection1.name,
          flashCardCount : collection1.flashcardcount,
          flashcards : flashcards1
      }

      console.log(collWFlashCards)
    }


    async function insertAll(){

        var collectionidee = uuid();

        var collectionObj : Collection = {
            collectionid : collectionidee,
            name : "collection 1",
            flashcardcount : 3
        }

        var flashcardObj1 : Flashcard = {
            flashcardid : "$" + uuid(),
            collectionid : collectionidee,
            countid : 1,
            frontside : "9+10",
            backside : "21"
        }
        var flashcardObj2 : Flashcard = {
            flashcardid : "$" + uuid(),
            collectionid : collectionidee,
            countid : 2,
            frontside : "777",
            backside : "LETS GOOOOOO"
        }
        var flashcardObj3 : Flashcard = {
            flashcardid : "$" + uuid(),
            collectionid : collectionidee,
            countid : 3,
            frontside : "powerhouse of the cell",
            backside : "mitochondria"
        }

        var flashCardArray : Array<Flashcard> = [];
        flashCardArray.push(flashcardObj1);
        flashCardArray.push(flashcardObj2);
        flashCardArray.push(flashcardObj3);

        dbService.insertCollectionAndFlashCards(collectionObj, flashCardArray);

        console.log("ADD ALL")

    }


    async function seeCollections() {
        var coll = await dbService.getSingleCollectionById('02ddc7d8-0f7c-4ed7-b3d9-67beabf2fce7');
        await setCollections({
            collection : [coll],
            testString : "dsa"
        })
        console.log(coll);
        console.log(collections.collection)
        console.log("GET");
    }




    return(
        <div>
            <Header />
            <h1>DB Methods Testtttt</h1>
            <br />
            <hr />
            <h1>J Coleslaw</h1>
            <img src={Cole} alt="J Cole" title="J cole (lol)" />
            <h1>J coleslaw</h1>

            <h4>Collection name</h4>
            <input type="text" name="text" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} />
            <h4>flash card count</h4>
            <input type="number" name="number" value={collectionCount} onChange={(e) => setCollectionCount(parseInt(e.target.value))} />
            <button onClick={async () => await addCollection()}>Add</button>


            <hr />
            <button onClick={async () => await loadCollections()}>Load collections</button>
            <button onClick={async () => await seeCollections()}>See Collections</button>
            <button onClick={() => console.log(collections.collection)}>See AGAIN</button>
            <button onClick={async () => await addCollection()}>Add Collection</button>
            <button onClick={async () => await insertAll()}>Insert ALL</button>
            <button onClick={async () => await getCollectionWFlashcards()}>Get collectionWFlashcard</button>
            <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>

            





        </div>
    )
}

//loadcollection
//insertall