'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpecialitiesSchema extends Schema {
  up () {
    this.create('specialities', (table) => {
      table.increments()
      table.string('name', 50).notNullable().unique()
      table.string('description', 250)
      table.timestamps()
    })
  }

  down () {
    this.drop('specialities')
  }
}

module.exports = SpecialitiesSchema
