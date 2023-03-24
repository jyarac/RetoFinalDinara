import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"

test("listar preguntas del formulario", async({client, assert})=>{
    const token = await obtenerTokenAutorizacion()
    const response = await client.get("api/v1/form/getquestions").header("Authorization", `Bearer ${token}`)
    response.assertStatus(200)
    assert.isTrue(response.body().state)
})