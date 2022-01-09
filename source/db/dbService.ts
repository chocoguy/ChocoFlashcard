import { DATA_TYPE, Connection } from 'jsstore';

const getWorkerPath = () => {
    if (process.env.NODE_ENV == 'development'){
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
    }else{
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
    }
}

const workerPath = getWorkerPath().default;
export const dbConnection = new Connection(new Worker(workerPath))
export const dbname = 'flashingcards'

const getDatabase = () => {
    const tblFlashCardCollections = 
    {
        name : "flashcardcollection",
        columns: {
            id: {
                primaryKey: true,
                dataType: DATA_TYPE.String
            },
            name: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            flashcardcount: {
                dataType: DATA_TYPE.Number
            }
        }
    }

    const tblFlashCards = 
    {
        name : "flashcards",
        columns: {
            id: {
                primaryKey: true,
                dataType: DATA_TYPE.String
            },
            flashcardcollectionid: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            countid: {
                dataType: DATA_TYPE.Number
            },
            frontside: {
                dataType: DATA_TYPE.String
            },
            backside: {
                dataType: DATA_TYPE.String
            }

        }
    }

    const dataBase = {
        name : dbname,
        tables: [tblFlashCardCollections, tblFlashCards]
    };

    return dataBase;

};





export const dbService = {

    
   
}

export const initJsStore = () => {
    try{
        const dataBase = getDatabase();
        dbConnection.initDb(dataBase);
    }catch (error){
        console.error("Error: " + error );
    }
    
}