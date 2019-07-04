"use strict";
const User = use("App/Models/User");
const Token = use("App/Models/Token");

class AuthController {
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
 
}

module.exports = AuthController;
