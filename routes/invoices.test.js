process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

// afterEach(async () => {
//     await db.query('DELETE FROM invoices')
// })

afterAll(async () => {
    await db.end()
})

describe("GET /invoices", function () {
  test("Gets list of invoices", async function () {
    const res = await request(app).get(`/invoices`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      "invoices": [
        {comp_code:'apple', amt:100, paid:false, paid_date:null, add_date: "2021-04-25T06:00:00.000Z", id:1},
        {comp_code:'apple', amt:200, paid:false, paid_date:null, add_date: "2021-04-25T06:00:00.000Z", id:2},
        {comp_code:'apple', amt:300, paid:true, paid_date:"2018-01-01T07:00:00.000Z", add_date: "2021-04-25T06:00:00.000Z", id:3},
        {comp_code:'ibm', amt:400, paid:false, paid_date:null, add_date: "2021-04-25T06:00:00.000Z", id:4},
      ]
    });
  });
});

describe("GET /invoices/1", function () {
  test("Get invoice info", async function () {
    const res = await request(app).get(`/invoices/1`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
           invoice: {
            comp_code: "apple",
            id: 1,
            amt: 100,
            add_date: '2021-04-25T06:00:00.000Z',
            paid: false,
            paid_date: null,
          }
    });
  });
});

describe("POST /invoices", function () {
  test("Adds an invoice", async function () {
    const res = await request(app).post(`/invoices`).send({amt: 450, comp_code: 'ibm'})
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
           invoice: {
            comp_code: "ibm",
            id: 5,
            amt: 450,
            add_date: '2021-04-25T06:00:00.000Z',
            paid: false,
            paid_date: null,
          }
    });
  });
});

describe("PUT /invoices/1", function () {
  test("Updates an invoice", async function () {
    const res = await request(app).put(`/invoices/1`).send({amt: 550})
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
           invoice: {
            comp_code: "apple",
            id: 1,
            amt: 550,
            add_date: '2021-04-25T06:00:00.000Z',
            paid: false,
            paid_date: null,
          }
    });
  });
});


describe("DELETE /invoices/5", function () {
  test("Updates an invoice", async function () {
    const res = await request(app).delete(`/invoices/5`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "deleted" });
  });
});


