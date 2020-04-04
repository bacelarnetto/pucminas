import express from 'express'
import AlertController from './app/controllers/AlertController'

const routes = express.Router();

routes.post('/barragem', AlertController.storeByBarragem);
routes.post('/moradores', AlertController.storeByMoradores);

module.exports = routes;