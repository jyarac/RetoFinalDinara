import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"
test.group("testing a metodo actualizar ts", () => {
    test("actualizar", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        let body= {
            "Name":"cc"
        }
        const response = await client.put("api/v1/typesdocument/update/1").json(body).header("Authorization", `Bearer ${token}`)
        response.assertStatus(200)
        assert.isTrue(response.body().state)
        })

    test("actualizar td inexistente", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        let body= {
        }
    
        const response = await client.put("api/v1/typesdocument/update/500").json(body).header("Authorization", `Bearer ${token}`)
        response.assertStatus(400)
        assert.isFalse(response.body().state)
        })
})        
