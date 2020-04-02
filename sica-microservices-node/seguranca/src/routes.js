import express from 'express'
import BarragemController from './app/controllers/BarragemController'

const routes = express.Router();


routes.post('/barragem', BarragemController.store);

module.exports = routes;