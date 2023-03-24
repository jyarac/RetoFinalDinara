import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"

test.group("testing a metodo Actualizar preguntas", () => {
    test("actualizar preguntas", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        let body= {
            "question": "¿que dia es hoy?"
        }
        const response = await client.put("api/v1/questions/updateQuestion/2").json(body).header("Authorization", `Bearer ${token}`)
        response.assertStatus(200)
        assert.isTrue(response.body().state)
        })
    test("actualizar pregunta inexistente", async({client, assert})=>{
            const token = await obtenerTokenAutorizacion()
            let body= {
                "question": "¿que dia es hoy?"
            }
            const response = await client.put("api/v1/questions/updateQuestion/70").json(body).header("Authorization", `Bearer ${token}`)
            response.assertStatus(400)
            assert.isFalse(response.body().state)
        })
})