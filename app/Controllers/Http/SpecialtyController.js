'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Speciality = use('App/Models/Speciality')
/**
 * Resourceful controller for interacting with specialties
 */
class SpecialtyController {
  /**
   * Show a list of all specialties.
   * GET specialties
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index ({ response }) {
  
    try {

      //const specialties = await Speciality.all();
      const specialties = await Speciality.query().with('hospitals').fetch();

      response.status(200).json({
        status : "success",
        message : "Especialidades carregadas",
        specialties
      })


    } catch (erro) {
      response.status(200).json({
        status : "error",
        message : "Erro ao carregar",
        error
      })
    }
  
  }

  /**
   * Create/save a new specialty.
   * POST specialties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
      const { name, description } = request.all();

      const specialty = await Speciality.create({ name, description })

      response.status(201).json({
        status : "success",
        message: "Especialidade criada com sucesso",
        specialty
      })

    
  
  }

  /**
   * Display a single specialty.
   * GET specialties/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    
    try {
      
      const isSpecialty = await Speciality.findBy('id', params.id) 
      
      if(isSpecialty){

        const specialty = await Speciality.query().with('hospitals').where('id', params.id).fetch()

        response.status(200).json({
          status : "success",
          message: "Especialidade Carregada",
          specialty
        })
      }else{
        response.status(500).json({
          status : "error",
          message: "Especialidade não encontrada",
        })
      }
    } catch (error) {
      response.status(500).json({
        status: "error",
        message: "Erro ao Carregar Especialidade",
        error
      })
    }
  
  }

  /**
   * Update specialty details.
   * PUT or PATCH specialties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    
    try {

      const {name} = request.only(['name'])

      const specialty = await Speciality.findBy('id', params.id)

      specialty.name = name || specialty.name

      await specialty.save();
      
      response.status(200).json({
        status: "success",
        message: "Especialidade atualizado com sucesso",
        specialty
      })


    } catch (error) {
      response.status(500).json({
        status: "error",
        message: "Erro ao atualizar especialidade",
        error
      })
    }
  }

  /**
   * Delete a specialty with id.
   * DELETE specialties/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      
      const specialty = await Speciality.findBy('id', params.id)

      await specialty.delete()

      response.status(200).json({
        status: "success",
        message: "Especialidade apagada"
      })

    } catch (error) {
      response.status(500).json({
        status: "error",
        message: "Erro ao apagar especialidade",
        error
      })
    }
  }
}

module.exports = SpecialtyController
