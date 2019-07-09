'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HospitalUsersSchema extends Schema {
  up () {
    this.create('hospital_users', (table) => {
      table.increments()
      table.integer('hospital_id').unsigned().notNullable().index('hospital_id')
      table.integer('user_id').unsigned().notNullable().index('user_id')
      table.foreign('hospital_id').references('hospitals.id').onDelete('cascade')
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('hospital_users')
  }
}

module.exports = HospitalUsersSchema
