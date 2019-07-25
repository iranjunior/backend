"use strict";
const User = use("App/Models/User");
const Token = use("App/Models/Token");

class AuthController {
  /**
   * Create/save a new specialty.
   * POST specialties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  
  async login({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    const user = await User.findBy("email", email);

    const token_create = Token.create({
      user_id: user.id,
      is_revoked: 0,
      ...token
    });

    return token_create;
  }
/**
   * Create/save a new specialty.
   * POST specialties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */ 
    async check({auth, response}){
      const validator = await auth.check();

      response.status(200).json({
        status: "success",
        message: "Usuario Logado",
        validator
      })
    }
}

module.exports = AuthController;
