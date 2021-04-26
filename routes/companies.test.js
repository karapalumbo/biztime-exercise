process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");


// afterEach(async () => {
//     await db.query('DELETE FROM companies')
// })

afterAll(async () => {
    await db.end()
})

describe("GET /companies", function () {
  test("Gets list of companies", async function () {
    const res = await request(app).get(`/companies`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ companies: [{ "code": "apple", "description": "Maker of OSX.", "name": "Apple Computer" },
    { "code": "ibm", "description": "Big blue.", "name": "IBM", },]});
  });
});

describe("GET /companies/apple", function () {
  test("Get company by code", async function () {
    const res = await request(app).get(`/companies/apple`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ company: {"code": "apple", "description": "Maker of OSX.", "name": "Apple Computer"}});
  });
});

describe("POST /companies", function () {
  test("Adds a company", async function () {
    const res = await request(app).post(`/companies`).send({
        code: "dell", name: "Dell", description: "Dell laptop"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ company: { "code": "dell", "description": "Dell laptop", "name": "Dell" },
});
  });
});

describe("PUT /companies", function () {
  test("Updates a company", async function () {
    const res = await request(app).put(`/companies/apple`).send({
        name: "New Apple", description: "Apple Computer"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ company: { "code": "apple", "description": "Apple Computer", "name": "New Apple" },
});
  });
});

describe("DELETE /companies", function () {
  test("Deletes a company", async function () {
    const res = await request(app).delete(`/companies/dell`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({status: 'deleted'});
  });
});
