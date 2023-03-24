import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"
test.group("testing a metodo registrar respuestas del estudiante", () => {
test("registrar respuestas exitosamente", async({client, assert})=>{
    const token = await obtenerTokenAutorizacion()
    let body=  {
            "estudianteId": 1,
            "answers": [4, 1, 3, 5]
    }
    const response = await client.post("api/v1/form/postquestions").json(body).header("Authorization", `Bearer ${token}`)
    response.assertStatus(200)
    assert.isTrue(response.body().state)
    })

test("registrar respuestas cuando no existe el usuario", async ({client, assert}) =>{
    const token = await obtenerTokenAutorizacion()
    let body=  {
            "estudianteId": 1555456,
            "answers": [4, 1, 3, 5]
    }
    const response = await client.post("api/v1/form/postquestions").json(body).header("Authorization", `Bearer ${token}`)
    response.assertStatus(400)
    assert.isFalse(response.body().state)
})

test("registrar respuestas inexistentes", async ({client, assert}) =>{
    const token = await obtenerTokenAutorizacion()
    let body=  {
            "estudianteId": 1,
            "answers": [4, 1, 3, 5, 190]
    }
    const response = await client.post("api/v1/form/postquestions").json(body).header("Authorization", `Bearer ${token}`)
    response.assertStatus(400)
    assert.isFalse(response.body().state)
})


})