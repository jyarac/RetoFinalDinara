import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"
test.group("testing a metodo Actualizar preguntas", () => {
    test("eliminar preguntas", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        const response = await client.delete("api/v1/questions/deleteQuestions/2").header("Authorization", `Bearer ${token}`)
        response.assertStatus(200)
        assert.isTrue(response.body().state)
        })
    test("eliminar preguntas inexistente", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        const response = await client.delete("api/v1/questions/deleteQuestions/70").header("Authorization", `Bearer ${token}`)
        response.assertStatus(400)
        assert.isFalse(response.body().state)
        })
})