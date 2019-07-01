const id = require('uuid/v1');// gera id automaticamente
id();

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

// Cadastra novo produto no sistema
const createProducts = (request, response) => {
    var userId = id();
    const { name, price, description} = request.body  
    pg.query(`INSERT INTO ${product.Product.getClassName()}(${product.Product.getProperties()})VALUES ($1, $2, $3, $4)`, [name, userId, price, description], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${userId}`)
    })
  }

module.exports = { getProducts, createProducts }