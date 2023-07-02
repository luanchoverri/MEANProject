var router = require('express').Router();
var ctrlMovies = require('../controllers/movieController');


router.get('/movies', ctrlMovies.getMovies);
router.get('/movies:id', ctrlMovies.getMovie);
router.post('/movies', ctrlMovies.postMovie);
router.delete('/movie:id', ctrlMovies.deleteMovie);

module.exports = router;