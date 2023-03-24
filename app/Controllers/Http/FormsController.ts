import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import Form from 'App/Models/Form'

export default class FormsController {

    public async list({response}: HttpContextContract){
        try {
          const questions = await Question.query().preload('options').orderBy('id_question')
    
          const formattedQuestions = questions.map((question) => ({
            id: question.id_question,
            question: question.question,
            options: question.options.map((option) => ({
              id: option.id_answer,
              option: option.answer,
            })),
          }))
    
          return ({
            state: true,
            questions: formattedQuestions,
          })
        } catch (error) {
          console.log(error)
    
          return response.status(400).json({
            state: false,
            message: 'Error al listar las preguntas',
          })
        }
      }


      public async register({ request, response}: HttpContextContract) {
        const Data = request.only(['estudianteId', 'answers'])
        try {
          console.log(Data.answers)
        for (const answer of Data.answers) {
          const option = new Form()
          option.id_answer = answer
          
          option.id_student = Data.estudianteId
          await option.save()
        }
          return {
            state: true,
            message: 'Formulario creado exitosamente',
          }
        } catch (error) {
          console.log(error)
          return response.status(400).json({
            state: false,
            message: 'Error al crear el formulario',
          })
        }
      }
    }



