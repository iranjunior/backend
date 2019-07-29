"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Hospital = use("App/Models/Hospital");
const Specialities = use('App/Models/Speciality')
const Database = use('Database')

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
    
    const  hospitals = await Database.select(
      'hospitals.id as id',
      'hospitals.name as hospital', 
      'hospitals.lat as lat',
      'hospitals.lng as lng',
      'hospitals.address as address',
      'specialities.name as speciality', 
      'vacancies.vacancies as vacancy'

      )
      .from('hospitals')
      .leftJoin('hospital_specialities', 'hospital_specialities.hospitals_id', 'hospitals.id')
      .leftJoin('specialities', 'hospital_specialities.specialities_id', 'specialities.id')
      .leftJoin('vacancies', 'vacancies.hospital_specialities','hospital_specialities.id')
      .orderBy('hospitals.id')


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
    const { name, address, lat, lng, specialities} = request.post();

    const hospital = await Hospital.create({ name, address, lat, lng });
   
    if(specialities){
      if(Array.isArray(specialities)){
            await hospital.specialities().attach(specialities)
      } else{
          await hospital.specialities().attach([specialities])
      }
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
      const hospital = await Database.select(
        'hospitals.name as hospital', 
        'hospitals.lat as lat',
        'hospitals.lng as lng',
        'hospitals.address as address',
        'specialities.name as speciality', 
        'vacancies.vacancies as vacancy'
  
        )
        .from('hospitals')
        .leftJoin('hospital_specialities', 'hospital_specialities.hospitals_id', 'hospitals.id')
        .leftJoin('specialities', 'hospital_specialities.specialities_id', 'specialities.id')
        .leftJoin('vacancies', 'vacancies.hospital_specialities','hospital_specialities.id')
        .where('hospitals.id', params.id)

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
      const { name, lat, lng, address, specialities } = request.all();

      const hospital = await Hospital.find( params.id );
      
      hospital.name = name || hospital.name;
      hospital.lat = lat || hospital.lat;
      hospital.lng = lng || hospital.lng;
      hospital.address = address || hospital.address;

      
    if (specialities) {
      if(Array.isArray(specialities))  
        await hospital.specialities().attach(specialities);
      else
        await hospital.specialities().attach([specialities]);
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
   
      const hospitals = Hospital.find(params.id);

      await hospitals.delete();

      response.status(200).json({
        status: "success",
        message: "Hospital apagado com sucesso"
      });
    
  }
}

module.exports = HospitalController;
