var router = require('express').Router();
var ctrlMovies = require('../controllers/movieController');

//gets
router.get('/movies', ctrlMovies.getMovies);
router.get('/movies:id', ctrlMovies.getMovie);
router.get('/movies/upcomings', ctrlMovies.getUpcomingsMovies);
//posts
router.post('/movies', ctrlMovies.postMovie);
//deletes
router.delete('/movies/delete:id', ctrlMovies.deleteMovie);

module.exports = router;