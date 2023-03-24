import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"
test.group("testing a metodo eliminar roles", () => {
    test("eliminar roles", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        const response = await client.delete("api/v1/roles/delete/1").header("Authorization", `Bearer ${token}`)
        response.assertStatus(200)
        assert.isTrue(response.body().state)
        })

    test("actualizar rol inexistente", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        const response = await client.delete("api/v1/typesdocument/delete/300").header("Authorization", `Bearer ${token}`)
        response.assertStatus(400)
        assert.isFalse(response.body().state)
        })
})        
