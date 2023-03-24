import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'
import User from 'App/Models/User'

export default class ValidarAdmin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header('authorization')

    if(authorizationHeader == undefined){
      return ctx.response.status(400).send({
        mensaje: "Falta el token de autorización",
        estado: 401,
      })
    }      

    try{
      const usersController = new UsersController()
      const {id} = await usersController.obtenerPayload(authorizationHeader)  
      const user = await User.find(id) 

      if(!user){
        return ctx.response.status(401).json({
          msj: 'Token no válido'
        })
      }
  
      if( user.id_rol != 2 ){
        return ctx.response.status(401).json({
          msj: 'No tiene permisos para acceder a esta ruta'
        })
      }
      await next()
    }catch(error){            
      console.log(error);
      ctx.response.status(400).json({"msj": "Token no valido"})
    }    
  }
}

