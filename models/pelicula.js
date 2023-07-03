const mongoose = require('mongoose');


// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://lu:lu@127.0.0.1:27017/test');
//   // use await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
//   console.log('Conexión establecida a la base de datos');
// }

const Schema = mongoose.Schema;

const peliculaSchema = new Schema({
  titulo: { type: String, required: true },
  anio:   { type: Number, required: true  },
  genero: { type: Array,  required: true },
  calificacion:  { type: String},
  idioma:   { type: String, required: true  },
  estreno:  { type: Date, required: true },
  sinopsis: { type: String, required: true  },
  protagonistas:  { type: Array},
  director:       { type: Array, required: true  },
  duracion:       { type: Number, required: true  },
  image:          { type: String}

});

// Crear el modelo basado en el esquema
const Pelicula = mongoose.model('Pelicula', peliculaSchema);

// Exportar el modelo para su uso posterior
module.exports = Pelicula;