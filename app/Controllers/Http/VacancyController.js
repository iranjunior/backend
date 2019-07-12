'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Vacancies = use('App/Models/Vacancy');
const HS = use('App/Models/HospitalSpeciality');
const Database = use('Database');
/**
 * Resourceful controller for interacting with vacancies
 */
class VacancyController {
  /**
   * Show a list of all vacancies.
   * GET vacancies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const vacancies = await Vacancies.all();

    return vacancies
  }

 
  /**
   * Create/save a new vacancy.
   * POST vacancies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    
    const {hospitals_id, specialities_id, vacancies, lim_vacancies } = request.all();

    const hospital_specialities = await Database.select('id')
    .from('hospital_specialities')
    .where({
      hospitals_id,
      specialities_id
    })
   //console.log("id: ", hospital_specialities[0].id)
    const vacancy = await Vacancies.create({ hospital_specialities: hospital_specialities[0].id  ,  vacancies, lim_vacancies })


    
    response.status(201).send({
      status: "success",
      message: "Vaga criada",
      vacancy
    })
  
  }

  /**
   * Display a single vacancy.
   * GET vacancies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }


  /**
   * Delete a vacancy with id.
   * DELETE vacancies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = VacancyController
