import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Header } from '../Controls/Header';
import  Cole  from '../public/assets/cole.jpg';
import { dbService } from '../db/dbService';
import { Collection } from '../db/Collection.types';
import { v4 as uuid } from 'uuid';



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
            flashCardCount : collectionCount
        }

        dbService.insertSingleCollection(collectionObj);

        console.log("ADD")




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
            <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>

            





        </div>
    )
}