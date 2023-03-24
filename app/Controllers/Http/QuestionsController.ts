import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from "App/models/Question"
import  Answer  from 'App/Models/Answer'


export default class QuestionsController {
  public async registrar({ request, response }: HttpContextContract) {
    const questionData = request.only(['question', 'options'])
    const question = new Question()
    question.question = questionData.question
    try {
      await question.save()

      for (const optionData of questionData.options) {
        const option = new Answer()

        option.answer = optionData.opcion
        option.isCorrect = optionData.iscorrect
        option.questionId = question.id_question

        await option.save()
      }

      return {
        state: true,
        message: 'Pregunta creada exitosamente'
      }
    } catch (err) {
      console.log(err)
      return response.status(400).json({
        state: false,
        message: 'Error al crear la pregunta'
      })
    }
  }
    public async listar() {
        const questions = await Question.query().select('id_question', 'question')
        return {
          state: true,
          questions: questions.map((q) => {
            return {
              id: q.id_question,
              question: q.question,
            }
          }),
        }
      }


      public async getOptions({ params,response }: HttpContextContract) {
        try {
          const options = await   Answer.query().where('question_id', params.id).select('id_answer', 'answer')
          return {
            state: true,
            message: 'Listado de opciones',
            options,
          }
        } catch (error) {
          return response.status(400).json({
            state: false,
            message: 'Error al obtener las opciones',
          })
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        const questionId = params.id
        try {
        const question = await Question.findByOrFail("id_question",questionId)
         await question.related('options').query().update({ isActive: false })
         question.isActive=false;
    
          return {
            state: true,
            message: 'Pregunta Eliminada con éxito',
          }
        } catch (err) {
          console.log(err)
          return response.status(400).json({
            state: false,
            message: 'Error al eliminar la pregunta',
          })
        }
      }

      public async editar({ request, params, response }: HttpContextContract) {
        try {
          const { question } = request.only(['question'])
          const id = params.id
    
          const pregunta = await Question.findOrFail(id)
          pregunta.question = question
    
          await pregunta.save()
    
          return {
            state: true,
            message: 'Pregunta editada con exito'
          }
        } catch (error) {
          console.error(error)
    
          return response.status(400).json({
            state: false,
            message: 'Error al editar la pregunta'
          })
        }
      }


      public async editarOpcion({ request, params, response }: HttpContextContract) {
        try {
          const { opcion, iscorrect } = request.only(['opcion',"iscorrect"])
          const id =params.id
    
          const option = await Answer.findByOrFail("id_answer",id)
          option.answer = opcion;
          option.isCorrect =iscorrect
    
          await option.save()
    
          return {
            state: true,
            message: 'Pregunta editada con exito'
          }
        } catch (error) {
          console.error(error)
    
          return response.status(400).json({
            state: false,
            message: 'Error al editar la pregunta'
          })
        }
      }


}