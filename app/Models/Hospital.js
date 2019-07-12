"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Hospital extends Model {

  static boot() {
    super.boot()
  }
  /**
     * A relationship on hospitals is required for view
     * work.
     *
     * @method users
     *
     * @return {Object}
  
  */

  users() {
    return this.belongsToMany('App/Models/User').pivotTable('hospital_users')
  }
  specialities() {
    return this.belongsToMany("App/Models/Speciality", 'hospitals_id','specialities_id' , 'id', 'id').pivotTable("hospital_specialities")
  }
  vacancies(){
    return this.hasMany("App/Models/Vacancy", 'id', 'hospitals_id')
  }
}

module.exports = Hospital;
