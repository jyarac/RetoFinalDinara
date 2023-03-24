import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_user').primary()
      table.string("first_name", 200).notNullable()
      table.string("second_name", 200).notNullable()
      table.string("surname", 200).notNullable()
      table.string("second_surname", 200).notNullable()
      table.integer('type_document').notNullable().references('id_type_doc').inTable('types_documents')
      table.string('document_number', 30).notNullable().unique()
      table.string('email', 250).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('phone', 30).notNullable()
      table.boolean('state').defaultTo(true)
      table.integer('id_rol').references('id_rol').inTable('roles').defaultTo(3)
      table.timestamps(true)
      })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
