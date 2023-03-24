import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"

test.group("testing a metodo listar roles", () => {
    test("registrar roles", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        const response = await client.get("api/v1/roles/getRoles").header("Authorization", `Bearer ${token}`)
        response.assertStatus(200)
        assert.isTrue(response.body().state)
        })
})        
