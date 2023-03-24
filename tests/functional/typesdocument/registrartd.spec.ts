import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"

test.group("testing a metodo registrar tipo documento", () => {
    test("registrar td", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        let body= {
            "Name":"ejemplo"
        }
        const response = await client.post("api/v1/typesdocument/create").json(body).header("Authorization", `Bearer ${token}`)
        response.assertStatus(200)
        assert.isTrue(response.body().state)
        })
})        
