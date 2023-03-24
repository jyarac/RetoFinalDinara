import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TypesDocument extends BaseModel {
  @column({ isPrimary: true })
  public id_type_doc: number

  @column()
  public name: string

  @column({ columnName: 'state' })
  public isActive: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
