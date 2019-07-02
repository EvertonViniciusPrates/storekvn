const id = require('uuid/v1'); // gera id automaticamente
id();
const bodyParser = require('body-parser')
const product = require('../models/Product');
const Pg = require('pg').Pool; // Pool, é pro drive do postGres
const pg = new Pg({
    user: 'postgres',
    host: 'localhost',
    database: 'storekvn',
    password: 'everton',
    port: 5432,
});

// Recupera todos produtos cadastrados no sistema
const getProducts = (request, response) => {
    pg.query(`SELECT * FROM ${product.Product.getClassName()}`, (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }
        response.status(200).json(results.rows)
    });
}

// Recupera produto por id
const getProductsById = (request, response) => {
    pg.query(`SELECT * FROM ${product.Product.getClassName()} where id = $1`, [request.params.id], (error, result) => {
        if (error) {
            console.log(error);
            throw error;
        }
        response.status(200).json(result)
    });
}

// Cadastra novo produto no sistema
const createProducts = (request, response) => {
    var userId = id();
    const {
        name,
        price,
        description
    } = request.body
    pg.query(`INSERT INTO ${product.Product.getClassName()}(${product.Product.getProperties()})VALUES ($1, $2, $3, $4)`, [name, userId, price, description], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`User added with ID: ${userId}`)
    })
}

// Atualiza produto no sistema
const updateUser = (request, response) => {
    const id = request.params.id;
    const {
        name,
        price,
        description
    } = request.body;
    update(request, product.Product, response);
}

function update(request, entityName, response){
    let proprerties = '';
    let count = 2;
    let id = '';    
    let list = [];
    var map = new Map(Object.entries(request.body));
    entityName.getProperties().forEach(prop => {
        list.push(map.get(prop)); 
        if(prop == 'id')
            id = prop +"= $"+1;            
        else
            proprerties = proprerties? `${prop} = $${count++},` + proprerties: `${prop} = $${count++}`;
    });
    pg.query(
        `UPDATE ${entityName.getClassName()} SET ${proprerties} WHERE ${id}`,
        list,        
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified:${JSON.stringify(request.body)}`)
        }
    );
}

module.exports = {
    getProducts,
    createProducts,
    getProductsById,
    updateUser
}