import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'types_documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_type_doc')
      table.string("name", 100).notNullable()
      table.boolean("state").defaultTo(true)
      table.timestamps(true)

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
