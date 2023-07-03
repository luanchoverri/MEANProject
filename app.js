const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json()) //middware para parsear jsons

var routes = require('./routes/index')
app.use("/api", routes);  // Cargamos las rutas


// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('<h1>Pagina principal</h1>');
  });


mongoose.
connect('mongodb://lu:lu@127.0.0.1:27017/test')
.then(()  => {
    console.log('Conexión establecida a la base de datos')
    // Iniciar el servidor
    app.listen(3000, () => {
        console.log(`Servidor Express iniciado en el puerto ${3000}`);
    });

}) .catch((error) => {
    console.log(error)
})

module.exports = app;
