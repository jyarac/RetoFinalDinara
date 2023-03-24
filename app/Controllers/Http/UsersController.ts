import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

const bcryptjs = require('bcryptjs')
export default class UsersController {  
    public async registrar({request,response}: HttpContextContract){

    const {firstName, secondName,surname, secondSurName,typeDocument,documentNumber,email,phone, password, rol} = request.all();
    try{
      const salt = bcryptjs.genSaltSync();
      const user = new User();
      const userExistente: Number = await this.getValidarUserExistente(documentNumber);
      if (userExistente != 0){ 
          return response.status(200).json({
              "state":false,
              "msg":"fallo en la creacion de estudiante"
          })
      }
      user.first_name = firstName;
      user.second_name = secondName;
      user.surname = surname;
      user.email = email;
      user.second_surname = secondSurName;
      user.password = bcryptjs.hashSync(password, salt);
      user.second_surname = secondSurName;
      user.type_document = typeDocument
      user.phone = phone   
      user.document_number= documentNumber
      if(!rol){
        user.id_rol = 1;
      } else{
        user.id_rol = rol
      }
      await user.save();
      return{"state":true,"message": 
      "Estudiante creado correctamente"}
    }
   catch(error){
    console.log(error);
    return response.status(400).json({"state":false,"message": 
    "Fallo en la creación del estudiante"})
   }
   }
  async getValidarUserExistente(id_user: Number): Promise<Number>{
    const total = await User.query().where({'id_user':id_user}).count('*').from('users');
    console.log(total[0]);
    return parseInt(total[0].$extras['count'])
}

  public async login({request}: HttpContextContract){
    const email = request.input('email');
    const password = request.input('password');
    try {
      //consultar si existe usuario con ese correo
      const user = await User.findByOrFail('email', email);
      if(!user){
        return {
            "state": false,
            "message": "constraseña o email invalido"
        }
      }
      const validPassword = bcryptjs.compareSync(password, user.password);
      if ( !validPassword ) {
        return {
          "state": false,
          "message": "constraseña o email invalido"
        }   
      }

      //Validar si la contraseña ingresada es igual a la del usaurio
      const payload ={
        'id': user.id_user,
        "name":user.first_name+" "+user.second_name+" "+user.surname+" "+user.second_surname,
        "role":user.id_rol
      }

      const token:string = this.generarToken(payload); //activar token cuando se necesite

      return{
        "token":token, //activar token cuando se necesite
        "state":true,
        payload}
        
    } catch (error) {
      console.log(error);
      return{"state": false,
            "message":"contraseña o email invalido "};
    }
  }

  public generarToken(payload: any):string{
    const opciones = {
      expiresIn: "320 mins"
    }
    return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)    
  }

  public verificarToken(authorizationHeader:string){
    let token = authorizationHeader.split(' ')[1]
    jwt.verify(token, Env.get('JWT_SECRET_KEY'), (error)=>{
        if(error){
            throw new Error("Token expirado");
        }
    })
    return true
  }
  
  public obtenerPayload (authorizationHeader:string) {
    let token = authorizationHeader.split(' ')[1]
    const payload = jwt.verify(token, Env.get("JWT_SECRET_KEY"), {complete: true}).payload
    console.log(payload)
    return payload
  }


  public async listar({request}: HttpContextContract){
    const { perPage, page, filter } = request.all();
    try{
      const usersQuery = User.query().select('first_name', 'second_name', 'surname', 'second_surname', 'type_document', 'document_number', 'email', 'phone').where((query) => {
          if(filter && filter.name){
            query.where('first_name', 'like', `%${filter.name}%`).orWhere('second_name', 'like', `%${filter.name}%`).orWhere('surname', 'like', `%${filter.name}%`).orWhere('second_surname', 'like', `%${filter.name}%`);
          }
      });
      const users = await usersQuery.paginate(page, perPage);
      return {"state": true, "message": "Listado de estudiantes", "users": users.toJSON().data}
    }
    catch(error){
      console.log(error);
      return{"state":false,"message": "Fallo en la obtención del listado de estudiantes"}
    }
  }

//crud

  public async actualizar({request, response,params}: HttpContextContract){
    const {firstName, secondName, surname, secondSurname, typeDocument, documentNumber, email, phone} = request.all();
    try{
      const user = await User.findOrFail(params.id);
      user.first_name = firstName;
      user.second_name = secondName;
      user.surname = surname;
      user.email = email;
      user.second_surname = secondSurname;
      user.type_document = typeDocument
      user.phone = phone   
      user.document_number= documentNumber
      await user.save();
      return response.status(200).json({
        "state": true,
        "message": "Se actualizo correctamente"
    })
    ;
    }
    catch(error){
      console.log(error);
      return response.status(400).json({
        "state": false,
        "message": "Error al actualizar"
    })
    }
  }
  public async buscarid({ request, response }: HttpContextContract){
    try{
      const search = request.param("id");
      const users= await User.findByOrFail("id_user", search);
      return {
        firstName: users.first_name,
        secondName: users.second_name,
        surname: users.surname,
        secondSurName: users.second_surname,
        typeDocument: users.type_document,
        documentNumber: users.document_number,
        email: users.email,
        phone: users.phone,
      }
    } catch (err) { 
      console.log(err);
      return response.status(400).json({
        "state": false,
        "message": "Error al consultar el detalle del usuario"
    })
    }
}

}