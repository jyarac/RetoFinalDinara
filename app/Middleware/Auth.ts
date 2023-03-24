import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'

export default class Auth {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader: any = ctx.request.header('authorization')

    if(authorizationHeader == undefined){
      return ctx.response.status(400).send({
        mensaje: "Falta el token de autorización",
        estado: 401,
      })
    }

    try{
      const usuariosController = new UsersController()
      usuariosController.verificarToken(authorizationHeader)
      await next()
    }catch(error){            
      console.log(error);
      ctx.response.status(400).send("Falla relacionada con el token")
    }
  }
}
