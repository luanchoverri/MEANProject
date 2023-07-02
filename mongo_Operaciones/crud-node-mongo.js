const { MongoClient, ObjectId } = require('mongodb');
const dbName = 'test';
const url = 'mongodb://lu:lu@127.0.0.1:27017/' + dbName;
const client = new MongoClient(url);
const database = client.db(dbName);
const movies = database.collection('peliculas');


// Función para insertar una nueva película
/*En este caso, utilizamos una función de flecha dentro del forEach y marcamos la función como async para poder usar el await dentro de ella. Sin embargo, debemos tener en cuenta que el forEach no espera a que las promesas se resuelvan, por lo que es posible que no obtengamos el resultado esperado.
Si queremos asegurarnos que todas las inserciones se completen antes de continuar, usar un bucle for...of con async/await:  */
// async function crearPelicula(peliculas) {
//   peliculas.forEach(async (pelicula) => {
//     const existe = await movies.findOne({ titulo: pelicula.titulo });
//     if (existe != null) {
//       console.log('La pelicula ya exite, no fue insertada');
//     } else {
//       const result = await movies.insertOne(pelicula);
//       console.log('Película insertada:', result.insertedId);
//     }
//   });

async function crearPeliculas(peliculas) {
  for (pelicula of peliculas) {
    const existe = await movies.findOne({ titulo: pelicula.titulo });
    if (existe != null) {
      console.log('La pelicula ya existe, no fue insertada:' + (pelicula.titulo));
    } else {
      const result = await movies.insertOne(pelicula);
      console.log('Película insertada:', result.insertedId);
    }
  }
};



// Función para obtener todas las películas
async function leerPeliculas() {

  const query = {};
  const options = {
    sort: { titulo: 1 }, // sort returned documents in ascending order by title (A->Z)
    projection: { _id: 0, titulo: 1, genero: 1, director: 1, anio: 1 },  // Include only the `title` and `imdb` fields in each returned document
  };

  const peliculas = await movies.find(query, options).toArray();
  console.log('Películas encontradas:', peliculas);
}


// Función para buscar una película por titulo y actualizarla con otro campo
async function buscarPeliculaPorTituloYActualizar(titulo, campoActualizacion, nuevoValor) {

  const queryTituloInsensileMayusMin = { titulo: { $regex: new RegExp(titulo, 'i') }, };
  const updateQuery = { $set: { [campoActualizacion]: nuevoValor } };

  const result = await movies.updateOne(queryTituloInsensileMayusMin, updateQuery);
  console.log('Película actualizada:', result.modifiedCount);
}


// Función para eliminar una película
async function eliminarPelicula(titulo) {
  // crea la expresión regular a partir del texto de búsqueda (titulo). La opción 'i' indica que la búsqueda debe ser insensible a mayúsculas/minúsculas
  const queryTituloInsensileMayusMin = { titulo: { $regex: new RegExp(titulo, 'i') }, };

  const result = await movies.deleteMany(queryTituloInsensileMayusMin);
  console.log('Película eliminada:', result.deletedCount);
}

// Ejecutar operaciones CRUD
async function ejecutarOperacionesCRUD() {

  try {
    const nuevas = [
      { titulo: "RAPIDO Y FURIOSO X",
        anio: 2023,
        genero: ["Accion"],
        calificacion: "ATP",
        idioma: "2D Cast",
        estreno: Date("2023-04-05T00:00:00.000Z"),
        sinopsis: "Fast X es una película de acción estadounidense dirigida por Louis Leterrier y escrita por Justin Lin y Dan Mazeau. Es la secuela de F9, que actúa como la décima entrega principal y el undécimo largometraje de la franquicia Fast & Furious. ",
        premios: {
          ganados: 0,
          nominaciones: 0,
        },
        protagonistas: ["Vin Disel"],
        director: ["Louis Leterrier"],
        duracion: 135,
      },
      { titulo: "La sirenita",
        anio: 2023,
        genero: ["Fantasía", "Musical", "Aventura"],
        calificacion: "ATP",
        idioma: "2D SUB",
        estreno: new Date("2023-05-25T00:00:00.000Z"),
        sinopsis: "La sirenita es una película de fantasía y aventura basada en el cuento de hadas del mismo nombre. Sigue la historia de Ariel, una joven sirena que sueña con vivir en la superficie y experimentar el mundo humano.",
        premios: {
          ganados: 0,
          nominaciones: 0
        },
        protagonistas: ["Atriz Principal"],
        director: ["Director Principal"],
        duracion: 120
      },
      { titulo: "Guardianes de la Galaxia",
        anio: 2023,
        genero: ["Acción", "Aventura", "Ciencia ficción"],
        calificacion: "PG-13",
        idioma: "Inglés",
        estreno: new Date("2023-03-15T00:00:00.000Z"),
        sinopsis: "Guardianes de la Galaxia es una película de acción y aventura espacial que sigue las aventuras de un grupo de inadaptados que se unen para proteger la galaxia de diversas amenazas. Esta entrega presenta una nueva historia llena de acción y humor.",
        premios: {
          ganados: 0,
          nominaciones: 0
        },
        protagonistas: ["Actor Principal"],
        director: ["Director Principal"],
        duracion: 140
      },
      { titulo: "EVIL DEAD: EL DESPERTAR",
        anio: 2023,
        genero: ["Terror"],
        calificacion: "R",
        idioma: "2D Sub",
        estreno: new Date("2023-06-30T00:00:00.000Z"),
        sinopsis: "Evil Dead es una película de terror que sigue a un grupo de amigos que se encuentran atrapados en una cabaña aislada, donde descubren un antiguo libro que desata fuerzas malignas. Pronto, tendrán que luchar por sus vidas contra las horripilantes criaturas que han despertado.",
        premios: {
          ganados: 0,
          nominaciones: 0
        },
        protagonistas: ["Alyssa Sutherland", "Lily Sullivan"],
        director: ["Lee Cronin"],
        duracion: 110
      }
    ];

    await crearPeliculas(nuevas);
    await leerPeliculas();
    await eliminarPelicula('EVIL DEAD: EL DESPERTAR');
    await buscarPeliculaPorTituloYActualizar("La sirenita", "protagonistas", ["Halle Bailey", "Melissa McCarthy", "Javier Bardem"]);
    await buscarPeliculaPorTituloYActualizar("La sirenita", "director",  ["Rob Marshall"]);
    await buscarPeliculaPorTituloYActualizar("guardianes de la galaxia", "protagonistas", ["Chris Pratt", "Zoe Saldana", "Dave Bautista", "Vin Diesel", "Bradley Cooper"]);
    await buscarPeliculaPorTituloYActualizar("guardianes de la galaxia", "director",  ["James Gunn"]);


  } finally {
    await client.close();
  }
}

ejecutarOperacionesCRUD().catch(console.dir);