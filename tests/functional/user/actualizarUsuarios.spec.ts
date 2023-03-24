import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"
test.group("testing a metodo actualizar usuarios", () => {
test("actualizar usuarios", async({client, assert})=>{
    const token = await obtenerTokenAutorizacion()
    let body= {
        "firstName": "daniel",
        "secondName": "jose",
        "surname": "cruz",
        "secondSurName": "casallas",
        "typeDocument": 1,
        "documentNumber": "12345679",
        "email": "daniel881@gmail.co",
        "password":"123456",
        "rol":2,
        "phone": "32123122314"
    }
    
    const response = await client.put("api/v1/user/update/2").json(body).header("Authorization", `Bearer ${token}`)
    response.assertStatus(200)
    assert.isTrue(response.body().state)
    })

test("actualizar usuario inexistente", async({client, assert})=>{
    const token = await obtenerTokenAutorizacion()
    let body= {
        "firstName": "daniel",
        "secondName": "jose",
        "surname": "cruz",
        "secondSurName": "casallas",
        "typeDocument": 1,
        "documentNumber": "12345679",
        "email": "daniel881@gmail.co",
        "password":"123456",
        "rol":2,
        "phone": "32123122314"
    }
    
    const response = await client.put("api/v1/user/update/70").json(body).header("Authorization", `Bearer ${token}`)
    response.assertStatus(400)
    assert.isFalse(response.body().state)
    })
})