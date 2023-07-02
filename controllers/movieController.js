const { default: mongoose } = require('mongoose');
const Pelicula = require('../models/pelicula')

getMovies = async function (req, res) {
    try {
        const peliculas = await Pelicula.find({})
        res.status(200).json(peliculas);
    } catch (error) {
        console.log(error);
        res.status(500).send({mesage: error.mesage});
    }
    
}

getMovie = async function (req, res) {
    try {
        const {id} = req.params
        const movie = await Pelicula.findById(id)
        res.status(200).json(movie);
    } catch (error) {
       
        res.status(500).send({mesage: error.mesage});
    }
    
}

deleteMovie = function (req, res) {
}


postMovie = async function (req, res) {
    try {
        const pelicula = await Pelicula.create(req.body)
        res.status(200).json(pelicula);
    } catch (error) {
        console.log(error);
        res.status(500).send({ mesage: error.mesage });
    }
}




module.exports = {
    getMovies,
    getMovie,
    deleteMovie,
    postMovie
}