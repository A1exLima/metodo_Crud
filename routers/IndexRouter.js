// Requizicao do modulo NPM Express
const express = require('express');

// Confiuracao do modulo express para chamar como função como router
const router = express.Router();


// Requisicao do IndexController dentro da pasta controller
const IndexController = require('../controllers/IndexController');

// Rota para página HOME
router.get('/', IndexController.index);

// Rotas para as páginas do METODO GET
router.get('/metodo_get', IndexController.metodoGet);
router.get('/metodo_registro_contato', IndexController.registroContato);

// Rotas para as páginas do METODO POST
router.get('/metodo_post', IndexController.metodoPost);
router.post('/metodo_post', IndexController.dadosMetodoPost);
router.get('/dados_usuario', IndexController.viewDadosUsuario);

// Rotas para as páginas do METODO PUT
router.get('/metodo_put', IndexController.metodoPut);
router.put('/metodo_put', IndexController.processamentoMetodoPut);

// Rotas para as páginas do METODO DELETE
router.get('/metodo_delete', IndexController.metodoDelete);
router.delete('/metodo_delete', IndexController.processamentoMetodoDelete);

// Exportando o index router para ser usado no Indexcontroller
module.exports = router; 