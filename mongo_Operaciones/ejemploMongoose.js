const mongoose = require('mongoose');
const dbName = 'test';
const url = 'mongodb://lu:lu@127.0.0.1:27017/' + dbName ;


var Cat = mongoose.model('Cat', { name: String });
var kitty = new Cat({ name: 'Zildjian' });
mongoose.connect(url, function (err) {
if (err) throw err;
console.log('Successfully connected');
kitty.save(function (err) {
if (err) { console.log(err); } else {
console.log('meow');
mongoose.connection.close(); } }); });