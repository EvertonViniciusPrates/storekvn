const msg = require('./Messages')
/**
 * 
 * This class receive a http request and return a message with data about him self
 */
class CommandResult{

    /**
     * 
     * @param {*} request represents the http request
     * this static method return a message with sucess about your request
     * can return create, alter, delete or get operation
     */
    static operationSaveSucessful(request){        
        msg.header = "Operação realizada com sucesso!";
        msg.typeMessage = request.method;        
        msg.content = request.body;
        return JSON.stringify(msg);
    }

    static operationSaveError(request){        
        msg.header = "Ocorreu um erro, estamos analisando!";
        msg.typeMessage = request.method;        
        msg.content = request.body;
        return JSON.stringify(msg);
    }

    static operationQuerySucessful(result){        
        msg.header = "Operação realizada com sucesso!";    
        msg.content = result.rows;
        msg.length = result.rowCount;
        return JSON.stringify(msg);
    }

    static operationQueryError(){        
        msg.header = "Ocorreu um erro, estamos analisando!";
        msg.typeMessage = "Bad Request";        
        msg.content = "Error 500";
        return JSON.stringify(msg);
    }
}       
module.exports = {CommandResult: CommandResult}