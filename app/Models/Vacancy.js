'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vacancy extends Model {

    hospitalSpecialities(){
        return this.belongsTo('App/Models/HospitalSpeciality')
    }
}

module.exports = Vacancy
