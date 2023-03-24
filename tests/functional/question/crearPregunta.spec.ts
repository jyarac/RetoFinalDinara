import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"

test.group("testing a metodo registrar preguntas", () => {
test("registrar pregunta", async({client, assert})=>{
    const token = await obtenerTokenAutorizacion()
    let body= {
        "question": "¿que dia es hoy?",
        "options": [
            {
                "opcion":"esta es correcta",
                "iscorrect":true
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            } ]
    }    
    
    const response = await client.post("api/v1/questions/create").json(body).header("Authorization", `Bearer ${token}`)
    response.assertStatus(200)
    assert.isTrue(response.body().state)
    })

test("registrar pregunta sin datos", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        let body= {
        }    
        
        const response = await client.post("api/v1/questions/create").json(body).header("Authorization", `Bearer ${token}`)
        response.assertStatus(400)
        assert.isFalse(response.body().state)
        })
})