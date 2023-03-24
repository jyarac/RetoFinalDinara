import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"


test.group("testing a metodo buscar id de usuarios", () => {


test("buscar por id usuarios", async({client, assert})=>{
    const token = await obtenerTokenAutorizacion()
    const response = await client.get("api/v1/user/getUser/1").header("Authorization", `Bearer ${token}`)
    response.assertStatus(200)
    assert.deepEqual(response.body(),{
        "firstName": "daniel",
        "secondName": "jose",
        "surname": "cruz",
        "secondSurName": "casallas",
        "typeDocument": 1,
        "documentNumber": "123456789",
        "email": "danielc88@gmail.co",
        "phone": "32123122314"
        })
    })

test("buscar por id a un usuario inexistente", async({client, assert})=>{
    const token = await obtenerTokenAutorizacion()
    const response = await client.get("api/v1/user/getUser/70").header("Authorization", `Bearer ${token}`)
    response.assertStatus(400)
    })

})
