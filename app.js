const express = require('express');
const app = express();

app.set("view engine", 'ejs');

const IndexRouter = require ('./routers/IndexRouter');
app.use('/', IndexRouter);

app.listen(3000, ()=> {console.log('Server Runing Port 3000')});
