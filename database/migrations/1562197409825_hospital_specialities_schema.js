'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HospitalSpecialitiesSchema extends Schema {
  up () {
    this.create('hospital_specialities', (table) => {
      table.increments()
      table
      .integer('hospitals_id')
      .notNullable()
      .unsigned()
      .index('hospitals_id')
      table
      .integer('specialities_id')
      .notNullable()
      .unsigned()
      .index('specialities_id')
      table
       .foreign('hospitals_id')
       .references('hospitals.id')
       .onDelete('cascade')
      table
       .foreign('specialities_id')
       .references('specialities.id')
       .onDelete('cascade')
    })
  }

  down () {
    this.drop('hospital_specialities')
  }
}

module.exports = HospitalSpecialitiesSchema
