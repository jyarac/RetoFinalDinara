import { test } from "@japa/runner"
import { obtenerTokenAutorizacion } from "../TestAuth"
test.group("testing a metodo registrar usuarios", () => {
    test("registrar usuarios", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        let body= {
            "firstName": "daniel",
            "secondName": "jose",
            "surname": "cruz",
            "secondSurName": "casallas",
            "typeDocument": 1,
            "documentNumber": "955525458",
            "email": "dani88@hotm.com",
            "password":"123456",
            "rol":2,
            "phone": "32123122314"
        }
        
        const response = await client.post("api/v1/user/create").json(body).header("Authorization", `Bearer ${token}`)
        response.assertStatus(200)
        assert.isTrue(response.body().state)
        })
    test("registrar usuarios sin datos enviados", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        let body= {
        }
        
        const response = await client.post("api/v1/user/create").json(body).header("Authorization", `Bearer ${token}`)
        response.assertStatus(400)
        assert.isFalse(response.body().state)
        })

test("registrar usuario ya registrado", async({client, assert})=>{
        const token = await obtenerTokenAutorizacion()
        let body= {
            "firstName": "daniel",
            "secondName": "jose",
            "surname": "cruz",
            "secondSurName": "casallas",
            "typeDocument": 1,
            "documentNumber": "123458",
            "email": "danielc881@gmail.com",
            "password":"123456",
            "rol":2,
            "phone": "32123122314"
        }
        
        const response = await client.post("api/v1/user/create").json(body).header("Authorization", `Bearer ${token}`)
        response.assertStatus(400)
        assert.isFalse(response.body().state)
        })
})   