import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'answers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id_answer")//identificador unico de opcion, usado para editar la opcion de respuesta
      table.string('answer')
      table.boolean('is_correct')
      table.integer('question_id').unsigned().references('id_question').inTable('questions')
      table.boolean("state").defaultTo(true)
    })
  }


  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
