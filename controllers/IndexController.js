const fs = require('fs');
const dadosUsuario = require('../database/dadosUsuario.json');


module.exports ={

    index: (req, res) =>{
        res.render('index.ejs');
    },

    metodoGet: (req, res) => {
        res.render('metodoGet.ejs');
    },

    registroContato: (req, res) => {
        let dadosContato = req.query;
        res.render('dadosContato.ejs', {dadosContato});
    },

    metodoPost: (req, res) => {
        return res.render('metodoPost.ejs');
    },
    
    dadosMetodoPost: (req,res) =>{
        
        let dados = req.body;
        dadosUsuario.push(dados);
        fs.writeFileSync('./database/dadosUsuario.json', JSON.stringify(dadosUsuario, null, 4));

        res.redirect('/dados_usuario');
        
    },

    viewDadosUsuario: (req, res) => {
        res.render('dadosUsuario.ejs', {dadosUsuario});
    }
}