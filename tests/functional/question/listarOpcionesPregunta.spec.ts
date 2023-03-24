import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"
test.group("testing a metodo istar opciones de una pregunta", () => {
test("listar opciones de pregunta", async({client, assert})=>{
    const token = await obtenerTokenAutorizacion()
    const response = await client.get("api/v1/questions/getOptions/2").header("Authorization", `Bearer ${token}`)
    response.assertStatus(200)
    assert.isTrue(response.body().state)
    })
})