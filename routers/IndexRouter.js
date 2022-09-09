const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/IndexController');

router.get('/', IndexController.index);
router.get('/metodo_get', IndexController.metodoGet);
router.get('/metodo_registro_contato', IndexController.registroContato);


module.exports = router;