const Pg = require('pg').Pool; // Pool, é pro drive do postGres
module.exports = {
    pg: new Pg({
        user: 'postgres',
        host: 'localhost',
        database: 'storekvn',
        password: 'everton',
        port: 5432,
    })
}