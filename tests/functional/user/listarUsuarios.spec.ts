import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"

test("listar usuarios", async({client, assert})=>{
    const token = await obtenerTokenAutorizacion()
    const response = await client.get("api/v1/user/getUser").header("Authorization", `Bearer ${token}`)
    response.assertStatus(200)
    assert.isTrue(response.body().state)
})