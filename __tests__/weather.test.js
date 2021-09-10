
const app = require('../app')
const request = require('supertest')

beforeAll(() => {
  process.env.NODE_ENV='TEST'
})

describe("GET /weather ", () => {

  test("Weather Request with wrong url", async () => {
    process.env.WEATHER_API_URL='http://localhost'
    const response = await request(app).get("/weather")
    expect(response.statusCode).not.toBe(200)
  })

  test("Weather Request", async () => {
    process.env.WEATHER_API_URL='https://api.openweathermap.org'
    const response = await request(app).get("/weather")
    expect(response.statusCode).toBe(200)
    expect(response.body.length).not.toBe(null)
    expect(response.body).toHaveProperty('data')
    expect(response.body).toHaveProperty('location')
    expect(response.body).toHaveProperty('unit')
    expect(response.body.unit).toBe('metric')
    expect(Array.isArray(response.body.data)).toBe(true)
  })
  
  
});