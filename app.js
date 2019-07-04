const express = require('express');
const bodyParser = require('body-parser') // trata a conversão do corpo de requisição
const app = express(); // basicamente gerencia toda nossa arquitetura, desde a conexão de banco a rotas.
const port = normalizaPort(process.env.PORT || '3000');
const db = require('./src/config/config');
const pdc = require('./src/controllers/ProductController');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

function normalizaPort(val) { //normalizador de porta,
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

app.get('/', pdc.getProducts);
app.get('/:id', pdc.getProductsById);
app.post('/', pdc.createProducts);
app.put('/alterar/:id', pdc.updateUser);

app.listen(port, function () { // ele ouve o que esta sendo executado;
    console.log(`app listening on port ${port}, Press ((command)ctrl) + C to stop the server`);
})
