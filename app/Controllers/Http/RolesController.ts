import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {   
    public async register({request}: HttpContextContract){
        const {Name} = request.all();
        const role = new Role();
        console.log({Name});
        role.name = Name;
        await role.save()
        return{"state":true, "msj": "Rol registrado"}
    }

    public async list(){
        try{
            const roles = await Role.all();
            return {"state":true,
            "data":roles };
        } catch(err){
            console.log(err);
            return{"state":false,
            "message":"error obteniendo roles" }
        }
    }

    public async update({request, params,response}: HttpContextContract){
        try{
            const { Name } = request.all();
            const { id } = params;
            const role = await Role.findOrFail(id);
            role.name = Name;
            await role.save();
            return {"state":true, "message": "Rol actualizado"}
        }catch (err){
            console.log(err);
            return response.status(400).json({"state":false,
            "message": "error actualizando rol"})

        }
    }

    public async delete({params, response}: HttpContextContract){
        try{
            const {id} = params;
            const role = await Role.findOrFail(id);
            role.isActive= false;
            return {"state":true,
            "message": "Rol eliminado"};
        }catch(err){
            console.log(err);
            return response.status(400).json({"state":false,
            "message":"error eliminando rol"})
        }
    }
}
