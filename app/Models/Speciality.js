'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Speciality extends Model {
    hospitals(){
        return this.belongsToMany("App/Models/Hospital", 'specialties_id' , 'hospitals_id', 'id', 'id').pivotTable("hospital_specialities")
    }

    vacancies(){
        return this.hasMany("App/Models/Vacancy", 'id', 'specialities_id')
    }
}

module.exports = Speciality
