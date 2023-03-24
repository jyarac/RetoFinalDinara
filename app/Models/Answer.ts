
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id_answer: number

  @column()
  public answer: string

  @column({ columnName: 'is_correct' })
  public isCorrect: boolean

  @column({ columnName: 'question_id' })
  public questionId: number

  @column({ columnName: 'state' })
  public isActive: boolean
  
}
