const { MongoClient } = require("mongodb");
const dbName = 'test'; 
const uri = 'mongodb://lu:lu@localhost:2222/' + dbName ;
const client = new MongoClient(uri);
async function run() {

    try {
const database = client.db(dbName);
const movies = database.collection("peliculas");
// Query for a movie that has the title 'The Room'
const query = { title: "Titanic" };
const options = {
// sort matched documents in descending order by rating
sort: { "imdb.rating": -1 },
// Include only the `title` and `imdb` fields in the returned document
projection: { _id: 0, title: 1, imdb: 1 },
};
const movie = await movies.findOne(query,options);
// since this method returns the matched document, not a cursor, print it directly
console.log(movie);
} finally { await client.close(); } }
run().catch(console.dir);