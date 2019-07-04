'use strict'

const Token = use('App/Models/Token')

class TokenController {
    async index(){
        const token = Token.query().with('users').fetch();

        return token
    }
}

module.exports = TokenController
