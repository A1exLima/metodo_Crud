const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/IndexController');

// PÁGINA HOME
router.get('/', IndexController.index);

// METODO GET
router.get('/metodo_get', IndexController.metodoGet);
router.get('/metodo_registro_contato', IndexController.registroContato);

// METODO POST
router.get('/metodo_post', IndexController.metodoPost);
router.post('/metodo_post', IndexController.dadosMetodoPost);
router.get('/dados_usuario', IndexController.viewDadosUsuario);

// METODO PUT
router.get('/metodo_put', IndexController.metodoPut);
router.put('/metodo_put', IndexController.processamentoMetodoPut);

// METODO DELETE
router.get('/metodo_delete', IndexController.metodoDelete);
router.delete('/metodo_delete', IndexController.processamentoMetodoDelete);

module.exports = router; 