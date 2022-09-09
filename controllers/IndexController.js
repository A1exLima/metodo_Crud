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
    }
}