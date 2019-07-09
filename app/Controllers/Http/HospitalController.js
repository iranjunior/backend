"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Hospital = use("App/Models/Hospital");
const Specialities = use('App/Models/Speciality')
const Vacancies = use('App/Models/Vacancy')

/**
 * Resourceful controller for interacting with hospitals
 */
class HospitalController {
  /**
   * Show a list of all hospitals.
   * GET hospitals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    //try {
    
    const hospitals = await Hospital.all()
    
      response.status(200).json({
        status: "success",
        message: "Hospitais carregados",
        hospitals
      });
    /* } catch (error) {
      response.status(500).json({
        status: "error",
        message: "Falha ao Carregar hospitais",
        error
      });
    } */
  }

  /**
   * Create/save a new hospital.
   * POST hospitals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { name, address, lat, lng, speciality, vacancies, lim_vacancies } = request.post();

    const hospital = await Hospital.create({ name, address, lat, lng });
   
    if(speciality && vacancies && lim_vacancies){
      
      const vacancy = await Vacancies.create({
        vacancies, 
        lim_vacancies
      })
      
      const specialities = await Specialities.find(speciality);
      await hospital.specialities().attach([specialities.id]);
      await hospital.vacancies().attach([vacancy.id]);
    }

    response.status(201).json({
      status: "success",
      message: "Hospital cadastrado com sucesso",
      hospital
    });
  }

  /**
   * Display a single hospital.
   * GET hospitals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async show({ params, response }) {
    //try {
    const hospital_exist = Hospital.findBy("id", params.id);
    if (hospital_exist) {
      const hospital = await Hospital.query().with('users').with('specialities.vacancies').where('id', params.id).fetch()

      response.status(200).json({
        status: "success",
        message: "Hospital carregado com sucesso",
        hospital
      });
    } else {
      response.status(500).json({
        status: "error",
        message: "Hospital nao encontrado"
      });
    }
    /*} catch (error) {
      response.status(500).json({
        status: "error",
        error
      });
    }*/
  }

  /**
   * Update hospital details.
   * PUT or PATCH hospitals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    //try {
      const { name, lat, lng, address, speciality, vacancies, lim_vacancies } = request.all();

      const hospital = await Hospital.find( params.id );
      
      hospital.name = name || hospital.name;
      hospital.lat = lat || hospital.lat;
      hospital.lng = lng || hospital.lng;
      hospital.address = address || hospital.address;

    if (speciality && speciality != 0) {
        const specialities = await Specialities.find(speciality);
      
        await hospital.specialities().attach([specialities.id]);
        
        if((vacancies && lim_vacancies) && (vacancies >= 0 && lim_vacancies >= 0)){
          const vacancy = await Vacancy.create({
            hospitals_id: hospital.id,
            specialties_id: specialities.id,
            vacancies,
            lim_vacancies
    
          });
          
        }  
      }
      
      
      await hospital.save();

      response.status(200).json({
        status: "success",
        message: "Hospital Atualizado com sucesso",
        hospital
      });
    /*} catch (error) {
      response.status(500).json({
        status: "error",
        message: "Error ao atulizar hospital",
        error
      });
    }*/
  }

  /**
   * Delete a hospital with id.
   * DELETE hospitals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const hospital = Hospital.findBy("id", params.id);

      await hospital.delete();

      response.status(200).json({
        status: "success",
        message: "Hospital apagado com sucesso"
      });
    } catch (error) {
      response.status(500).json({
        status: "error",
        error
      });
    }
  }
}

module.exports = HospitalController;
