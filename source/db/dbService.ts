import { openDB, deleteDB, wrap, unwrap } from "idb";
import { Collection } from "./Collection.types";
import { CollectionWithFlashcard } from "./CollectionWithFlashcard";
import { Flashcard } from "./Flashcard.types";


export class dbService {

   static async initTables(){
        
     const dbPromise = openDB('flashcards', 1, {
         upgrade(db) {
             if(!db.objectStoreNames.contains('collection')){
                const collectionStore = db.createObjectStore('collection', {
                    keyPath : 'collectionid'
                });
                collectionStore.createIndex('name', 'name', {unique : false})
                collectionStore.createIndex('flashcardcount', 'flashcardcount', {unique : false})
             }
             if(!db.objectStoreNames.contains('flashcard')){
                const flashcardStore = db.createObjectStore('flashcard', {
                    keyPath : 'flashcardid'
                });
                flashcardStore.createIndex('collectionid', 'collectionid', {unique : false})
                flashcardStore.createIndex('countid', 'countid', {unique : false})
                flashcardStore.createIndex('frontside', 'frontside', {unique : false})
                flashcardStore.createIndex('backside', 'backside', {unique : false})
             }
         }
     })

        
 
    }

    static async insertSingleCollection(collectionObject : Collection) {
        console.log(collectionObject)
        const db = await openDB('flashcards', 1)
        var tx = db.transaction('collection', 'readwrite')
        var store = tx.objectStore('collection');
        store.add(collectionObject)
    }

    static async getSingleCollectionById(collectionId : string) {
        const db = await openDB('flashcards', 1)
        var tx = db.transaction('collection', 'readonly');
        var store = tx.objectStore('collection');
        return store.get(collectionId)

    }

    static async getFlashcardsByCollectionId(collectionId : string) {
       // var flashCardsFromCollection : Array<Flashcard>  = []

        const db = await openDB('flashcards', 1);
        const tx = db.transaction('flashcard', 'readwrite');
        const store = tx.objectStore('flashcard')
        const collectionIdIndex = store.index("collectionid")
        return collectionIdIndex.getAll(collectionId)

    }

    static async getSingleCollectionWithFlashcards(collectionId : string) {
        var flashCardsFromCollection : Array<Flashcard> = []
        var tempCollection : Collection = {
            collectionid : "-1",
            name : "Not init",
            flashcardcount : -1
        }

        const db = await openDB('flashcards', 1);
        var tx1 = db.transaction('collection', 'readonly');
        var collectionStore = tx1.objectStore('collection');
        var currentCollection = collectionStore.get(collectionId)

        //flashcards

        var tx2 = db.transaction('flashcard', 'readonly');
        var index = tx2.store.index('collectionid');
        for await ( const cursor of index.iterate(collectionId)) {
            const flashcard = { ...cursor.value }
            flashCardsFromCollection.push(flashcard);
        }
        var flashcardStore = tx2.objectStore('flashcard')



    }


    static async insertSingleFlashcard(flashcardObject : Flashcard){
        const db = await openDB('flashcards', 1);
        var tx = db.transaction('flashcard', 'readwrite');
        var store = tx.objectStore('flashcard')
        store.add(flashcardObject);
    }


    static async getSingleFlashCardById(flashcardId : string){
        const db = await openDB('flashcards', 1);
        var tx = db.transaction('flashcard', 'readonly');
        var store = tx.objectStore('flashcard');
        return store.get(flashcardId);
    }


    static async insertCollectionAndFlashCards(collectionObject : Collection, flashCardArray : Array<Flashcard>){
        const db = await openDB('flashcards', 1);
        var flashcardtx = db.transaction('flashcard', 'readwrite');
        var flashcardstore = flashcardtx.objectStore('flashcard')

        var collectiontx = db.transaction('collection', 'readwrite');
        var collectionstore = collectiontx.objectStore('collection');

        collectionstore.add(collectionObject);
        
        for (let i = 0; i < flashCardArray.length; i++) {
            flashcardstore.add(flashCardArray[i])
            
        }

    }



    static async updateCollectionAndFlashCards(collectionObject : Collection, flashCardArray : Array<Flashcard>){
      try{

        var currentCollectionFlashCards = await this.getFlashcardsByCollectionId(collectionObject.collectionid)

      const db = await openDB('flashcards', 1);
      var flashcardtx = db.transaction('flashcard', 'readwrite');
      var flashcardstore = flashcardtx.objectStore('flashcard')



      var collectiontx = db.transaction('collection', 'readwrite');
      var collectionstore = collectiontx.objectStore('collection');
      console.log("open")
      collectionstore.put(collectionObject);
      console.log("put collection")

      for (let i = 0; i < currentCollectionFlashCards.length; i++) {
        flashcardstore.delete(currentCollectionFlashCards[i].flashcardid)
        //flashcardstore.add(flashCardArray[i])
        //flashcardstore.put(flashCardArray[i])
      }
      for (let i = 0; i < flashCardArray.length; i++) {
        console.log(flashCardArray[i])
        //flashcardstore.delete(flashCardArray[i].flashcardid)



        flashcardstore.add(flashCardArray[i])



        //flashcardstore.put(flashCardArray[i])


      }
    }
    catch(error){
      console.log(error)
    }



    }


    static async addUpdateSingleCollection(collectionObject : Collection) {
      try{
        const db = await openDB('flashcards', 1);
        var collectiontx = db.transaction('collection', 'readwrite');
        var collectionstore = collectiontx.objectStore('collection');
        console.log("OPENN")
        collectionstore.put(collectionObject)
        console.log("PUT da COLLECTION")
      }
      catch(error){
        console.log(error)
      }
    }


    static async deleteSingleCollection(collectionObject : Collection) {
      //should probably also delete associated flashcards
      try{

        var currentCollectionFlashCards = await this.getFlashcardsByCollectionId(collectionObject.collectionid)

        const db = await openDB('flashcards', 1);

        var flashcardtx = db.transaction('flashcard', 'readwrite');
        var flashcardstore = flashcardtx.objectStore('flashcard')

        var collectiontx = db.transaction('collection', 'readwrite');
        var collectionstore = collectiontx.objectStore('collection');

        for (let i = 0; i < currentCollectionFlashCards.length; i++) {
          flashcardstore.delete(currentCollectionFlashCards[i].flashcardid)
          //flashcardstore.add(flashCardArray[i])
          //flashcardstore.put(flashCardArray[i])
        }

        console.log("OPENN")
        collectionstore.delete(collectionObject.collectionid)
        console.log("DELETE da COLLECTION")
      }
      catch(error){
        console.log(error)
      }
    }



    static async deleteSingleCollectionByCollectionId(collectionId : string) {
      //should probably also delete associated flashcards
      try{

        var currentCollectionFlashCards = await this.getFlashcardsByCollectionId(collectionId)

        const db = await openDB('flashcards', 1);

        var flashcardtx = db.transaction('flashcard', 'readwrite');
        var flashcardstore = flashcardtx.objectStore('flashcard')

        var collectiontx = db.transaction('collection', 'readwrite');
        var collectionstore = collectiontx.objectStore('collection');

        for (let i = 0; i < currentCollectionFlashCards.length; i++) {
          flashcardstore.delete(currentCollectionFlashCards[i].flashcardid)
          //flashcardstore.add(flashCardArray[i])
          //flashcardstore.put(flashCardArray[i])
        }

        console.log("OPENN")
        collectionstore.delete(collectionId)
        console.log("DELETE da COLLECTION")
      }
      catch(error){
        console.log(error)
      }
    }


    static async getAllCollections() {
        const db = await openDB('flashcards', 1);
        const tx = db.transaction('collection', 'readwrite');
        const store = tx.objectStore('collection')
        return  store.getAll()
    }






    


  //  static async main() {

  //   const db = await openDB('Articles', 1, {
  //       upgrade(db) {
  //         // Create a store of objects
  //         const store = db.createObjectStore('articles', {
  //           // The 'id' property of the object will be the key.
  //           keyPath: 'id',
  //           // If it isn't explicitly set, create a value by auto incrementing.
  //           autoIncrement: true,
  //         });
  //         // Create an index on the 'date' property of the objects.
  //         store.createIndex('date', 'date');
  //       },
  //     });
    
  //     // Add an article:
  //     await db.add('articles', {
  //       title: 'Article 1',
  //       date: new Date('2019-01-01'),
  //       body: '…',
  //     });
    
  //     // Add multiple articles in one transaction:
  //     {
  //       const tx = db.transaction('articles', 'readwrite');
  //       await Promise.all([
  //         tx.store.add({
  //           title: 'Article 2',
  //           date: new Date('2019-01-01'),
  //           body: '…',
  //         }),
  //         tx.store.add({
  //           title: 'Article 3',
  //           date: new Date('2019-01-02'),
  //           body: '…',
  //         }),
  //         tx.done,
  //       ]);
  //     }
    
  //     // Get all the articles in date order:
  //     console.log(await db.getAllFromIndex('articles', 'date'));
    
  //     // Add 'And, happy new year!' to all articles on 2019-01-01:
  //     {
  //       const tx = db.transaction('articles', 'readwrite');
  //       const index = tx.store.index('date');
    
  //       for await (const cursor of index.iterate(new Date('2019-01-01'))) {
  //         const article = { ...cursor.value };
  //         article.body += ' And, happy new year!';
  //         cursor.update(article);
  //       }
    
  //       await tx.done;
  //     }
   
  //   }






   
}

