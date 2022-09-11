
// requisicao da configuracao app.use(express.json()) 
const { json } = require('express');

// Requisicao do modulo nativo file system
const fs = require('fs');

// Requisicao do banco de dados que contem os usuários e senhas
const dadosUsuario = require('../database/dadosUsuario.json');

// Objeto Literal ja pronto para exportacao de todos os controllers
module.exports ={

    // PÁGINA HOME - ( IRÁ EXIBIR PARA O USUÁRIO TODOS OS MÉTODOS CRUD)
    // Redenrizacao da página Home
    index: (req, res) =>{
        res.render('index.ejs');
    },

    // METODO GET - ( IRA EXIBIR  PARA O USUÁRIO OS FORMULÁRIOS PARA INSERIR O NOME E EMAIL PARA SER ENVIADO VIA MÉTODO GET)
    // Redenrizacao da página Método Get para captura dos dados via formulário
    metodoGet: (req, res) => {
        res.render('metodoGet.ejs');
    },

    // Processamento dos dados enviados via (metodo get) URL (querystring) e redenrizacao dos dados após processamento
    registroContato: (req, res) => {

        // Captura os dados enviados via url e salvamento em uma variavel
        let dadosContato = req.query;

        // Renderiza em uma view os dados (nome e e-mail) capturados via querystring
        res.render('dadosContato.ejs', {dadosContato});
    },

    // METODO POST - ( IRA EXIBIR PARA O USUARIO OS FORMULARIOS PARA CRIAR UM NOME DE USUARIO E SENHA, PARA SER ENVIADO VIA METODO POST)
    // Redenrizacao da página Método Post para captura dos dados via formulário
    metodoPost: (req, res) => {
        res.render('metodoPost.ejs');
    },
    
    // Processamento dos dados enviados via (metodo post), inclusao desses dados na ultima posicao do array, salvamento
    // via fs.writefileSync no banco de dados, convertido em formato json e redirecionamento para a pagina de exibicao dos dados processados e confirmados
    dadosMetodoPost: (req,res) =>{
        
        // Captura dos dados (NOME USUÁRIO E SENHA) enviados via Método Post através do req.body e salvamento em uma variavel
        let dados = req.body;

        // Inclusao do nome de usuario e senha da ultima posicao do array do banco de dados onde é guardado todos os usuarios e senhas
        dadosUsuario.push(dados);

        // conversao dos dados em tipo Json, e atraves da funcao nativa fs o salvamento desses dados dentro da database em formato json
        fs.writeFileSync('./database/dadosUsuario.json', JSON.stringify(dadosUsuario, null, 4));

        //Redirecionamento para a página de confirmacao do novo usuario e senha criada e exibicao de todos os usuarios e senhas para confirmacao
        res.redirect('/dados_usuario');
        
    },
    // Rederizacao da pagina de confirmacao de novo usuario e senha
    viewDadosUsuario: (req, res) => {
        res.render('dadosUsuario.ejs', {dadosUsuario});
    },

    // METODO PUT - ( IRA IXIBIR AO USUARIO OS FORMULARIOS PARA INFORMAR O NOME DE USUARIO ANTIGO E NOME DO NOVO USUARIO E SENHA PARA EFETUAR A ALTERACAO)
    // Redenrizacao da página Método Put para captura dos dados via formulário
    metodoPut: (req, res) => {
        res.render('metodoPut.ejs', {dadosUsuario});

    },

    // Processamento dos dados enviados via (metodo Put), localizacao dos dados dentro do banco de dados,
    // verificacao desses dados se foram encontrados ou nao, caso encontrado efetuar a alteracao dos dados, caso nao encontrado
    // informara ao usuario que nao foi localizado, salvamento via fs.writefileSync no banco de dados com os dados alterados, convertido em formato json 
    // e rederizacao para a pagina de exibicao dos dados processados e confirmados
    processamentoMetodoPut: (req, res) =>{

        // Captura dos dados (NOME USUÁRIO ANTIGO, NOME DE USUARIO NOVO E NOVA SENHA) enviados via Método Put através do req.body e salvamento em uma variavel
        let usuarioAntigo = req.body.usuarioAntigo;

        // localicao do usuario antigo atraves do método find
        let usuarioEncontrado = dadosUsuario.find(dadosUsuario => dadosUsuario.nome == usuarioAntigo);

        // verificacao se o usuario antigo foi localizado ou nao (if ternario), caso nao encontrado, redenriza para uma pagina informando que nao foi encontrado
        // caso encontre o usuario antigo, efetua a alteracao com o novo usuario e senha
        usuarioEncontrado == undefined ? res.render('usuarioNaoEncontrado.ejs', {usuario: usuarioAntigo}) :

        // alteracao do nome de usuario antigo para o novo usuario
        usuarioEncontrado.nome = req.body.nome;

        // alteracao da senha de usuario antiga para o nova senha
        usuarioEncontrado.password = req.body.password;

        // conversao dos dados em tipo Json, e atraves da funcao nativa fs o salvamento desses dados dentro da database em formato json
        fs.writeFileSync('./database/dadosUsuario.json', JSON.stringify(dadosUsuario, null, 4));

        // Rederizacao da pagina de confirmacao de ALTERACAO do novo usuario e senha
        res.render('usuarioEncontrado.ejs', {usuario: usuarioEncontrado});
    },

    // METODO DELETE - ( IRA IXIBIR AO USUARIO O FORMULARIO PARA INSERIR O NOME DE USUARIO QUE QUEIRA DELETAR E TODOS OS OS USUARIOS REGISTRADOS NO BANCO DE DADOS)
    // Redenrizacao da página Método DELETE para captura dos dados via formulário
    metodoDelete: (req, res) => {
        res.render('metodoDelete.ejs', {dadosUsuario});

    },

    // Processamento dos dados enviados via (metodo Delete), localizacao dos dados dentro do banco de dados,
    // verificacao desses dados se foram encontrados ou nao, caso encontrado apagar usuario e senha no banco de dados dados, caso nao encontrado
    // informara ao usuario que nao foi localizado, salvamento via fs.writefileSync no banco de dados sem os dados deletados, convertido em formato json 
    // e rederizacao para a pagina de exibicao dos dados processados e confirmados
    processamentoMetodoDelete: (req, res) => {

        // Captura dos dados (NOME DE USUARIO E SENHA) enviados via Método Delete através do req.body e salvamento em uma variavel
        let usuarioDeletar = req.body.usuarioDeletar;

        // localicao do usuario a ser deletado atraves do método find
        let usuarioEncontrado = dadosUsuario.find(dadosUsuario => dadosUsuario.nome == usuarioDeletar);

        // verificacao se o usuario foi localizado ou nao (if ternario), caso nao encontrado, redenriza para uma pagina informando que nao foi encontrado
        // caso encontre o usuario, efetuar o delete desse usuario e senha
        usuarioEncontrado == undefined ? res.render('usuarioNaoEncontrado.ejs', {usuario: usuarioDeletar}):

        // Metodo array para Remover o usuário encontrado junto com a Metodo indexOf para retornar a posicao do elemento dentro do Array
        // Metodo splice(): https://www.youtube.com/watch?v=SyuCjQCn05U
        // Metodo IndexOf(): https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
        dadosUsuario.splice(dadosUsuario.indexOf(usuarioEncontrado),1);

        // conversao dos dados em tipo Json, e atraves da funcao nativa fs o salvamento desses dados dentro da database em formato json
        fs.writeFileSync('./database/dadosUsuario.json', JSON.stringify(dadosUsuario, null, 4));

        // Rederizacao da pagina de confirmacao do DELETE do usuario e senha encontrados
        res.render('usuarioDeletado.ejs', { usuario: usuarioEncontrado});
    }
}



