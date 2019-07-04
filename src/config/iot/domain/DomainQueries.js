const commandResult = require('../../../notifications/CommandResult').CommandResult;
const conn = require('../../config').pg;
const id = require('uuid/v1'); /* gera id automaticamente */
id();

class DomainQueries {
    constructor() {
        this.properties = properties;
        this.list = list;
        this.id = id;
        this.count = count;
        this.map = map;
    }
    /**
     * 
     * @param {*} request represents the http request
     * @param {*} response represents the http response
     * @param {*} entity represent your type body of the request
     */
    static update(request, response, entity) {
        this.properties = '';
        this.count = 2;
        let id = '';
        this.list = [];
        this.map = new Map(Object.entries(request.body));
        entity.getProperties().forEach(prop => {
            this.list.push(this.map.get(prop));
            if (prop == 'id')
                id = prop + "= $" + 1;
            else
                this.properties = this.properties ? `${prop} = $${this.count++},` + this.properties : `${prop} = $${this.count++}`;
        });
        conn.query(`UPDATE ${entity.getClassName()} SET ${this.properties} WHERE ${id}`, this.list, (error) => {
            if (error)
                return response.status(500).send(commandResult.operationSaveError(request));
            else
                return response.status(200).send(commandResult.operationSaveSucessful(request));
        });
    }
    /**
     * 
     * @param {*} request represents the http request
     * @param {*} response represents the http response
     * @param {*} entity represent your type body of the request
     */
    static create(request, response, entity) {
        this.id = id();
        this.list = [];
        this.count = entity.getProperties().length;
        this.map = new Map(Object.entries(request.body));
        entity.getProperties().forEach(prop => {
            if (prop == 'id') {
                this.list.push(this.id);
                this.properties = `$${this.count--}`;
            } else {
                this.list.push(this.map.get(prop));
                this.properties = this.properties ? `$${this.count--},` + this.properties : `$${this.count--}`;
            }
        });
        conn.query(`INSERT INTO ${entity.getClassName()}(${entity.getProperties()})VALUES(${this.properties})`, this.list, (error, result) => {
            if (error)
                return response.status(500).send(commandResult.operationSaveError(request));
            else
                return response.status(200).send(commandResult.operationSaveSucessful(request));
        });
    }
    /**
     * 
     * @param {*} response represents the http response
     * @param {*} entity represent your type body of the request
     */
    static getAll(entity, response) {
        conn.query(`SELECT * FROM ${entity.getClassName()}`, (error, results) => {
            if (error)
                return response.status(500).send(commandResult.operationQueryError(results));
            else
                return response.status(200).send(commandResult.operationQuerySucessful(results));
        });
    }
    /**
     * 
     * @param {*} id it is necessary to inform the id for the execution of the method 
     * @param {*} response represents the http response
     * @param {*} entity represent your type body of the request
     */
    static getById(entity, id, response) {
        conn.query(`SELECT * FROM ${entity.getClassName()} where id = $1`, [id], (error, result) => {
            if (error)
                return response.status(500).send(commandResult.operationQueryError(result));
            else
                return response.status(200).send(commandResult.operationQuerySucessful(result));
        });
    }
}

module.exports = {
    DomainQueries: DomainQueries
};