const { MongoClient } = require("mongodb");
const dbName = 'test';
const uri = 'mongodb://lu:lu@127.0.0.1:27017/' + dbName ;
const client = new MongoClient(uri);
async function run() {
try {
const database = client.db(dbName);
const movies = database.collection('peliculas');
const doc = {
    titulo: "RAPIDO Y FURIOSO 8",
    anio: 2023,
    genero: "Accion" ,
    calificacion: "ATP",
    idioma:  "2D Cast",
    estreno: Date("2023-04-05T00:00:00.000Z"),
    sinopsis: " ",
    premios: {
       ganados: 0,
       nominaciones: 0
    },
    protagonistas: "Vin Disel",
    director: "Aaron Horvath",
    duracion: 190
 }
const result_insert = await movies.insertOne(doc);
console.log(result_insert);
} finally {
// Ensures that the client will close when you finish/error
await client.close(); } }
run().catch(console.dir);