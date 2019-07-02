class Product{
    constructor() {
        this.nome = nome;
        this.id = id;
        this.price = price;
        this.description = description;
    }
    static getClassName(){ return 'products'; };// nome da entidade do banco
    static getProperties(){ return ['id', 'name', 'price', 'description'] };// nome das colunas
}
//exporta  sua classe  caso precise dar um using nela em outro lugar do codigo
module.exports = { Product: Product }