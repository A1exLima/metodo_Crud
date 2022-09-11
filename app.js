const express = require('express');
const app = express();

app.set("view engine", 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static("public"));

const IndexRouter = require ('./routers/IndexRouter');
app.use('/', IndexRouter);

app.listen(3000, ()=> {console.log('Server Runing Port 3000')});
