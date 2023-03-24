import axios from "axios"
import env from "@ioc:Adonis/Core/Env"

export async function obtenerTokenAutorizacion(): Promise<string>{
    let endpoint ="/api/v1/login"
    let body= {
        "email": "danielc88@gmail.co",
        "password":"12345"
    } 
    let axiosResponse = await axios.post(`${env.get("PATH_APP")+ endpoint}`, body)
    return axiosResponse.data["token"]
}