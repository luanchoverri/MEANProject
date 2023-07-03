
const Pelicula = require('../models/pelicula')


//get all movies
getMovies = async function (req, res) {
    try {
        const peliculas = await Pelicula.find({})
        res.status(200).json(peliculas);
    } catch (error) {
        console.log(error);
        res.status(500).send({ mesage: error.mesage });
    }

};


//get a movie by ID
getMovie = async function (req, res) {
    try {
        const { id } = req.params
        const movie = await Pelicula.findById(id)
        res.status(200).json(movie);
    } catch (error) {

        res.status(500).send({ mesage: error.mesage });
    }

};

//delete movie by ID
deleteMovie = async function (req, res) {

    try {
        const { id } = req.params;
        const movie = await Pelicula.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }
        res.status(200).json({ message: 'Película eliminada correctamente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//post a movie
postMovie = async function (req, res) {
    try {
        const requiredFields = ['titulo', 'anio', 'genero', 'calificacion', 'idioma', 'estreno', 'sinopsis', 'protagonistas', 'director', 'duracion', 'image'];
        const missingFields = requiredFields.filter(field => !req.body.hasOwnProperty(field));

        if (missingFields.length > 0) {
            return res.status(409).json({ message: `Ya existe una película con el título "${titulo}" ` });
        }

        const { titulo } = req.body;

        const existingMovie = await Pelicula.findOne({ titulo });

        if (existingMovie) {
            return res.status(409).json({ message: 'Ya existe una película con el título "${titulo}"' });
        }

        const pelicula = await Pelicula.create(req.body);
        res.status(200).json(pelicula);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



getUpcomingsMovies = async function (req, res) {
    try {
        const currentDate = new Date()
        const upcomingMovies = await Pelicula.find({ estreno: { $gt: currentDate } })
        res.status(200).json(upcomingMovies);
    } catch (error) {

        res.status(500).send({ mesage: error.mesage });
    }
};



module.exports = {
    getMovies,
    getMovie,
    deleteMovie,
    postMovie,
    getUpcomingsMovies
}