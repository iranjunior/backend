"use strict";

const User = use("App/Models/User");
const Hospital = use("App/Models/Hospital");

class UserController {
  async index({ response }) {
    try {
      const users = await User.query().with('hospitals').fetch();


      response.status(200).json({
        status: "success",
        message: "Usuarios carregados",
        users
      });
    } catch (error) {
      response.status(500).json({
        status: "error",
        message: "Erro ao carregar usuarios"
      });
    }
  }
  async store({ request, response }) {
    try {
      const { username, email, password } = request.post();

      const user = await User.create({ username, email, password });

      response.status(201).json({
        status: "success",
        message: "Usuario Cadastrado com sucesso",
        user
      });
    } catch (error) {
      response.status(500).json({
        status: "error",
        error
      });
    }
  }
  async show({ params, response }) {
    const user_exist = await User.findBy("id", params.id);
    if (user_exist) {
      const user = await User.query()
        .with("hospitals")
        .where("id", params.id)
        .fetch();
      response.status(200).json({
        status: "success",
        message: "Usuario e seus tokens, carregados com sucesso",
        user
      });
    } else {
      response.status(500).json({
        status: "error",
        message: "Usuario não encontrado"
      });
    }
  }
  async update({ request, auth, response }) {
    try {
      const { username, email, hospitals } = request.all();

      const user = await auth.getUser();

      user.username = username || user.username;
      user.email = email || user.email;
      if (hospitals && hospitals != 0) {
        if(Array.isArray(hospitals))
          await user.hospitals().attach(hospitals);
        else
        await user.hospitals().attach([hospitals]);
      }

      await user.save();

      response.status(200).json({
        status: "success",
        message: "Usuario Atualizado com sucesso",
        user
      });
    } catch (error) {
      response.status(500).json({
        status: "error",
        error
      });
    }
  }
  async destroy({ auth, response }) {
    try {
      const user = auth.getUser();

      await user.delete();

      response.status(200).json({
        status: "success",
        message: "Usuario apagado com sucesso"
      });
    } catch (error) {
      response.status(500).json({
        status: "error",
        error
      });
    }
  }
}

module.exports = UserController;
