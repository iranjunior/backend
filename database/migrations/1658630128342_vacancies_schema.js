'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VacanciesSchema extends Schema {
  up () {
    this.create('vacancies', (table) => {
      table.increments()
      table
      .integer('vacancies')
      .defaultTo(0)
      .unsigned()
      table
      .integer('lim_vacancies')
      .defaultTo(0)
      .unsigned()
      table
      .integer('hospital_specialities')
      .unsigned()
      .notNullable()
      table
       .foreign('hospital_specialities')
       .references('hospital_specialities.id')
       .onDelete('cascade')
      
      table.timestamps()
    })
  }

  down () {
    this.drop('vacancies')
  }
}

module.exports = VacanciesSchema
