'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VacanciesSchema extends Schema {
  up () {
    this.create('vacancies', (table) => {
      table.increments()
      table
      .integer('vacancies')
      .unsigned()
      table
      .integer('lim_vacancies')
      .unsigned()
      table
      .integer('hospital_id')
      .unsigned()
      .notNullable()
      .index('hospital_id')
      table
      .integer('speciality_id')
      .unsigned()
      .notNullable()
      .index('speciality_id')
      table
       .foreign('hospital_id')
       .references('hospital_specialities.hospitals_id')
       .onDelete('cascade')
      table
       .foreign('speciality_id')
       .references('hospital_specialities.specialities_id')
       .onDelete('cascade')
      
      table.timestamps()
    })
  }

  down () {
    this.drop('vacancies')
  }
}

module.exports = VacanciesSchema
