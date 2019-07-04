//usings
const domainQueries = require('../config/iot/domain/DomainQueries').DomainQueries;
const product = require('../models/Product').Product;

// Recupera todos produtos cadastrados no sistema
const getProducts = (request, response) => {
    domainQueries.getAll(product,response);
}
// Recupera produto por id
const getProductsById = (request, response) => {
    domainQueries.getById(product, request.params.id, response);
}
// Cadastra novo produto no sistema
const createProducts = (request, response) => {
    domainQueries.create(request, response, product);
}
// Atualiza produto no sistema
const updateUser = (request, response) => {
    domainQueries.update(request, response, product);
}
module.exports = {
    getProducts,
    createProducts,
    getProductsById,
    updateUser
}