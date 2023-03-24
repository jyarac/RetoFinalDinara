import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"
test.group("testing a metodo Actualizar rerspuestas", () => {
    test("actualizar respuestas", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        let body=    {
            "opcion": "correcta",
            "iscorrect":true
        }
        const response = await client.put("api/v1/questions/updateAnswer/1").json(body).header("Authorization", `Bearer ${token}`)
        response.assertStatus(200)
        assert.isTrue(response.body().state)
        })

    test("actualizar respuesta inxestente", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        let body=    {
            "opcion": "correcta",
            "iscorrect":true
        }
        const response = await client.put("api/v1/questions/updateAnswer/70").json(body).header("Authorization", `Bearer ${token}`)
        response.assertStatus(400)
        assert.isFalse(response.body().state)
        })

    test("actualizar respuesta sin datos enviados", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        let body=    {
        }
        const response = await client.put("api/v1/questions/updateAnswer/1").json(body).header("Authorization", `Bearer ${token}`)
        response.assertStatus(400)
        assert.isFalse(response.body().state)
        })
})