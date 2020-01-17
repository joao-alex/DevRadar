const express = require('express');
const routes = express.Router();

const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

// index = lista , show = unico, store = criar, update = alterar, destroy = deletar

routes.get('/devs',DevController.index);
routes.post('/devs',DevController.store);

routes.get('/search', SearchController.index)


module.exports = routes