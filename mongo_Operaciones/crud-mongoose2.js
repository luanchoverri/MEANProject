const mongoose = require('mongoose');
const Pelicula = require('./pelicula-modelo');

// Establecer conexión a la base de datos
async function conectar() {
  await mongoose.connect('mongodb://lu:lu@127.0.0.1:27017/test');
  console.log('Conexión establecida a la base de datos');
}

// Crear una nueva película
async function crearPelicula() {
  const nuevaPelicula = new Pelicula({
    titulo: "RAPIDO Y FURIOSO X",
    anio: 2023,
    genero: "Accion" ,
    calificacion: "ATP",
    idioma:  "2D Cast",
    estreno: Date("2023-04-05T00:00:00.000Z"),
    sinopsis: "Fast X es una película de acción estadounidense dirigida por Louis Leterrier y escrita por Justin Lin y Dan Mazeau. Es la secuela de F9, que actúa como la décima entrega principal y el undécimo largometraje de la franquicia Fast & Furious. ",
    premios: {
       ganados: 0,
       nominaciones: 0
    },
    protagonistas: "Vin Disel",
    director: "Louis Leterrier",
    duracion: 150
  });

  try {
    const peliculaGuardada = await nuevaPelicula.save();
    console.log('Película guardada:', peliculaGuardada);
  } catch (error) {
    console.error('Error al guardar la película:', error);
  }
}

// Leer todas las películas
async function leerPeliculas() {
  try {
    const peliculas = await Pelicula.find().select('titulo director anio');
    console.log('Películas encontradas:', peliculas);
  } catch (error) {
    console.error('Error al consultar películas:', error);
  }
}

// Actualizar una película
async function actualizarPelicula() {
  const peliculaId = 'ID_DE_LA_PELICULA'; // Reemplaza con el ID válido de la película a actualizar

  try {
    const pelicula = await Pelicula.findByIdAndUpdate(peliculaId, { genero: 'Acción, Aventura' }, { new: true });
    console.log('Película actualizada:', pelicula);
  } catch (error) {
    console.error('Error al actualizar la película:', error);
  }
}

// Eliminar una película
async function eliminarPelicula() {
  const peliculaId = 'ID_DE_LA_PELICULA'; // Reemplaza con el ID válido de la película a eliminar

  try {
    const peliculaEliminada = await Pelicula.findByIdAndDelete(peliculaId);
    console.log('Película eliminada:', peliculaEliminada);
  } catch (error) {
    console.error('Error al eliminar la película:', error);
  }
}

// Ejecutar las operaciones CRUD
async function ejecutarOperacionesCRUD() {
  await conectar();

  await crearPelicula();
  await leerPeliculas();
  await actualizarPelicula();
  await eliminarPelicula();

  // Cerrar la conexión a la base de datos
  mongoose.disconnect();
}

ejecutarOperacionesCRUD().catch(error => console.log(error));
