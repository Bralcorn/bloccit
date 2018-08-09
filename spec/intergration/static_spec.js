const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

//#1
  describe("GET /", () => {

//#2
it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", (done) => {

//#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Bloccit");

//#4
        done();
      });
    });

  });

  describe("GET /about", () => {

    it("should return status code 200 and show 'About Us.'", (done) => {
    
          request.get(base + "about", (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(body).toBe("About Us.");
    
            done();
          });
        });
    
      });
});