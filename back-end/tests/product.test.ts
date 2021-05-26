// import { productsList } from "../controllers/productController";
const supertest = require("supertest");
const { app } = require("../app");
// import { app } from "../app";

describe("ProductList", () => {
  it("productlist", (done) => {
    supertest(app)
      .get("/product")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        // console.log("res", response.body);
        expect(Array.isArray(response.body.data)).toBeTruthy();
        expect(response.body.data.length).toEqual(3);
        done();
      })
      .catch((err) => {
        // expect(err.message).toBeTruthy();
        done(err);
      });
  });
});

describe("Productmudule async await", () => {
  it("productlist async await", async (done) => {
    // expect.assertions(1);
    try {
      // await fetchData();
      const response = await supertest(app).get("/product");
    //   console.log("res", response.body);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data.length).toEqual(3);
      done()
    } catch (e) {
      expect(e).toMatch("error");
      done(e)
    }
    // .set("Accept", "application/json")
    // .expect("Content-Type", /json/)
    // .expect(200)
    // .then((response) => {
    //   console.log("res", response.body);
    //   expect(Array.isArray(response.body.data)).toBeTruthy();
    //   expect(response.body.data.length).toEqual(3);
    //   done();
    // })
    // .catch((err) => {
    //   // expect(err.message).toBeTruthy();
    //   done(err);
    // });
  });
});
