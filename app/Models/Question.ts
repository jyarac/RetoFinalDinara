import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import  Answer  from './Answer'
export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id_question: number

  @column()
  public question: string

  @column({ columnName: 'state' })
  public isActive: boolean
  @hasMany(() => Answer, { foreignKey: 'questionId' })
  public options: HasMany<typeof Answer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
