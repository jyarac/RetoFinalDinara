import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo,BelongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from "./Role"
import TypesDocument from './TypesDocument'
import Answer from './Answer'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id_user: number

  @column()
  public first_name: string

  @column()
  public second_name: string

  @column()
  public surname: string

  @column()
  public second_surname: string

  @column()
  public type_document: number

  @column()
  public document_number: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public phone: string

  @column()
  public state: boolean

  @column()
  public id_rol: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
  @belongsTo(() => Role, {
    localKey: 'id_rol',
    foreignKey: 'id_rol',
  })
  public roleUsuario: BelongsTo<typeof Role>

  @belongsTo(() => TypesDocument, {
    localKey: 'id_type_document',
    foreignKey: 'type_document'
  })
  public typeDocumentUsuario: BelongsTo<typeof TypesDocument>
  @manyToMany(() => Answer, {
    localKey: 'id_user',
    pivotForeignKey: "id_student",
    relatedKey: "id_answer",
    pivotRelatedForeignKey: 'id_answer'
  })public answers: ManyToMany <typeof Answer>
}
