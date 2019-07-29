'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Speciality extends Model {

    hospitals() {
        return this.belongsToMany("App/Models/Hospital",'specialities_id',  'hospitals_id' , 'id', 'id').pivotTable("hospital_specialities")
      }
}

module.exports = Speciality
