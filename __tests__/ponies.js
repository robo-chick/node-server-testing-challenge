const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

// run the seeds programatically before each test to start fresh
beforeEach(async () => {
    await db.seed.run()
})

// close the database connection so the test process doesn't hang or give a warning
afterAll(async () => {
    await db.destroy()
})

describe("ponies integration tests", () => {
    it("GET /ponies", async () => {
        const res = await supertest(server).get("/ponies")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBeGreaterThanOrEqual(3)
        expect(res.body[1].name).toBe("Pinkie Pie")
    })

    it("GET /ponies/:id", async () => {
        const res = await supertest(server).get("/ponies/2")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("Pinkie Pie")
    })

    it("GET /ponies/:id sends error if pony not found", async () => {
        const res = await supertest(server).get("/ponies/6")
        expect(res.statusCode).toBe(404)
    })

    it("POST /ponies", async () => {
        const res = await supertest(server).post("/ponies")
        .send({name: "Applejack"})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("Applejack")
    })

    it("DELETE /ponies/:id", async () => {
        const res = await supertest(server).delete("/ponies/1")
        expect(res.statusCode).toBe(204)
    })

    it("DELETE /ponies/:id sends error if pony not found", async () => {
        const res = await supertest(server).delete("/ponies/88")
        expect(res.statusCode).toBe(404)
        expect(res.type).toBe("application/json")
    })
})

