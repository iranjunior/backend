'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HospitalSpeciality extends Model {

    vacancies(){
        return this.hasMany("App/Models/Vacancy", 'id', 'hospital_specialities')
    }
    hospitals(){
        return this.belongsToMany("App/Models/Hospital")
    }
    specialities(){
        return this.belongsToMany("App/Models/Speciality")
    }
}



module.exports = HospitalSpeciality
