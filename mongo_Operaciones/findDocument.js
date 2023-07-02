const { MongoClient } = require("mongodb");
const dbName = 'test';
const uri = 'mongodb://lu:lu@127.0.0.1:27017/' + dbName ;
const client = new MongoClient(uri);

async function run() {
    try {
    const database = client.db(dbName);
    const movies = database.collection("peliculas");
    // query for movies that have a runtime less than 15 minutes
    //const query = { runtime: { $lt: 15 } };
    const query = { };
    const options = {
    // sort returned documents in ascending order by title (A->Z)
    sort: { titulo: 1 },
    // Include only the `title` and `imdb` fields in each returned document
    projection: { _id: 0, titulo: 1, imdb: 1 },
    };
    const cursor = movies.find(query, options);
    // print a message if no documents were found
    if ((await movies.countDocuments(query)) === 0) {
    console.log("No documents found!");
    }
    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir);
    } finally { await client.close(); }}
    run().catch(console.dir);