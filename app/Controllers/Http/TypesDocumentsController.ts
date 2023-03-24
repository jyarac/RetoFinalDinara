import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypesDocument from 'App/Models/TypesDocument';
export default class TypesDocumentsController {

public async register({request}: HttpContextContract){
        const {Name} = request.all();
        const tipoDoc = new TypesDocument();
        console.log({Name});
        tipoDoc.name = Name;
        await tipoDoc.save();
        return{"state":true,
         "msj": "Tipo Documento registrado"}
    }
public async list(){
    try{
        const typesDocuments = await TypesDocument.all();
        return {"state":true,
        "data":typesDocuments };
    } catch(err){
        console.log(err);
        return{"state":false,
    "message":"error obteniendo tipos de documento" }
    }
    }
    public async update({request, params, response}: HttpContextContract){
        try{
            const { Name } = request.all();
            const { id } = params;
            const Type = await TypesDocument.findOrFail(id);
            Type.name = Name;
            await Type.save();
            return response.status(200).json({"state":true, "message": "tipo de documento actualizado"})
        }catch (err){
            console.log(err);
            return response.status(400).json({"state":false,
            "message": "error actualizando tipo de documento"})

        }
    }
    public async delete({params,response}: HttpContextContract){
        try{
        const {id} = params;
        const tipoDoc = await TypesDocument.findOrFail(id);
        tipoDoc.isActive = false;
        return {"state":true,
        "message": "Tipo Documento eliminado"};
    }catch(err){
        console.log(err);
        return response.status(400).json({"state":false,
    "message":"error eliminando tipo documento"})
    }
}
    
}
