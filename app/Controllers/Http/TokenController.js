'use strict'

const Token = use('App/Models/Token')

class TokenController {
    async index(){
        const token = Token.query().with('users').fetch();

        return token
    }
    async show({ params, response }){
        try {
            const token = await Token.findByOrFail('id', params.id)
        
            
        response.status(200).json({
            status: "Success",
            message: "Token carregado com sucesso",
            token
          });
        } catch (error) {
            
        response.status(500).json({
            status: "Error",
            message: "Falha ao carregar",
          });
        }
        
    }
}

module.exports = TokenController
