const mongoose = require('mongoose');
const Pelicula = require('./pelicula-modelo');

async function main() {
  await mongoose.connect('mongodb://lu:lu@127.0.0.1:27017/test');
  

  
  // Crear una nueva película
  const nuevaPelicula = new Pelicula({

          titulo: "Misterio a la vista",
          anio: 2023,
          genero: "Accion, Drama",
          calificacion: "PG-13",
          idioma: "Español Castellano",
          estreno: Date("2021-12-17T00:00:00.000Z"),
          sinopsis: "Tras haber abierto su propia agencia, Nick y Audrey Spitz se ven involucrados en un conflicto internacional cuando un amigo es secuestrado durante su boda.",
          premios: {
            ganados: 0,
            nominaciones: 0,
          },
          protagonistas: "Adam Sandler, Jennifer Aniston",
          director: "Jeremy Garelick",
          duracion: 167,

  });


  // Verificar si la película ya existe en la base de datos
  const existente = await Pelicula.findOne({ titulo : nuevaPelicula.titulo});
  if (existente) {
    console.log('La película ya existe en la base de datos. No se realizará la inserción.');

  }else{
    nuevaPelicula.save()
    .then(result => {
      console.log('Película guardada:', result);
    })
    .catch(error => {
      console.error('Error al guardar la película:', error);
    });
  }


  // Eliminar una película
  // Pelicula.deleteMany({titulo : "Spider-Man: No Way Home"})
  //   .then(() => {
  //     console.log('Película eliminada');
  //   })
  //   .catch(error => {
  //     console.error('Error al eliminar la película:', error);
  //   }); 


    Pelicula.find()
    .select('titulo anio genero')
    .then(peliculas => {
      console.log('Películas encontradas:', peliculas);
    })
    .catch(error => {
      console.error('Error al consultar películas:', error);
    });
}
main().catch(err => console.log(err));
