const app = require('../app')
const request = require('supertest')

beforeAll(() => {
 process.env.NODE_ENV='TEST'
})

describe("GET /news ", () => {

  test("News Request with wrong url", async () => {
    process.env.NEWS_API_URL='http://localhost'
    const response = await request(app).get("/news")
    console.log(response)
    expect(response.statusCode).not.toBe(200)
    
  })

  test("News Request Without search keyword", async () => {
    process.env.NEWS_API_URL='https://newsapi.org/v2'
    const response = await request(app).get("/news")
    expect(response.statusCode).toBe(200)
    expect(response.body.length).not.toBe(null)
    expect(response.body).toHaveProperty('data')
    expect(response.body).toHaveProperty('count')
    expect(Array.isArray(response.body.data)).toBe(true)
    
  });

  test("News Request with search keyword", async () => {
    process.env.NEWS_API_URL='https://newsapi.org/v2'
    const response = await request(app).get("/news?search=bitcoin")
    expect(response.statusCode).toBe(200)
    expect(response.body.length).not.toBe(null)
    expect(response.body).toHaveProperty('data')
    expect(response.body).toHaveProperty('count')
    expect(Array.isArray(response.body.data)).toBe(true)
    
  })
  
 
})