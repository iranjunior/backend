'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vacancy extends Model {

    specialties(){
        return this.hasOne('App/Models/Speciality', 'id', 'specialities_id')
    }
    Hospitals(){
        return this.hasOne('App/Models/Hospital', 'id', 'hospitals_id')
    }
}

module.exports = Vacancy
