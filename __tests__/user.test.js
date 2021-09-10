
const app = require('../app')
const request = require('supertest')

beforeAll(() => {
    process.env.NODE_ENV='TEST'
})

describe("POST /register ", () => {

  test("Register with all the credentials", async () => {
    const response = await request(app).post("/register").send({username:'test',email:'test',password:'test'})
    expect(response.statusCode).toBe(200)
    expect(response.body.length).not.toBe(null)
    expect(response.body).toHaveProperty('token')
  })

  test("Missing Credentials", async () => {
    const response = await request(app).post("/register").send({})
    expect(response.statusCode).not.toBe(200)
    
  })
});

describe("POST /login ", () => {
    test("Register with all the credentials", async () => {
      const response = await request(app).post("/login").send({email:'test',password:'test'})
      expect(response.statusCode).toBe(200)
      expect(response.body.length).not.toBe(null)
      expect(response.body).toHaveProperty('token')
    })
  
    test("Missing Credentials", async () => {
      const response = await request(app).post("/login").send({})
      expect(response.statusCode).not.toBe(200)
      
    })
  });