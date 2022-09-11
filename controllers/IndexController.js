const { json } = require('express');
const fs = require('fs');
const dadosUsuario = require('../database/dadosUsuario.json');


module.exports ={

    index: (req, res) =>{
        res.render('index.ejs');
    },
//METODO GET
    metodoGet: (req, res) => {
        res.render('metodoGet.ejs');
    },

    registroContato: (req, res) => {
        let dadosContato = req.query;
        res.render('dadosContato.ejs', {dadosContato});
    },
//METODO POST
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
    },
//METODO PUT
    metodoPut: (req, res) => {
        res.render('metodoPut.ejs', {dadosUsuario});

    },

    processamentoMetodoPut: (req, res) =>{
        let usuarioAntigo = req.body.usuarioAntigo;

        let usuarioEncontrado = dadosUsuario.find(dadosUsuario => dadosUsuario.nome == usuarioAntigo);

        usuarioEncontrado == undefined ? res.render('usuarioNaoEncontrado.ejs', {usuarioAntigo}) :

        usuarioEncontrado.nome = req.body.nome;
        usuarioEncontrado.password = req.body.password;

        fs.writeFileSync('./database/dadosUsuario.json', JSON.stringify(dadosUsuario, null, 4));

        res.render('usuarioEncontrado.ejs', {usuario: usuarioEncontrado});
    },
//METODO DELETE
    metodoDelete: (req, res) => {
        res.send('TESTE DELETE')

    },

    processamentoMetodoDelete: (req, res) => {

    }
}