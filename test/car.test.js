const  Car  = require('../app/models/car')

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../index.js');


describe("/cars", () => {



    describe("GET /", () => {
        it("should return all cars", async () => {
            const cars = [
                {name: "test 1", available: true},
                {name: "test 2", available: true},
            ]

            await Car.insertMany(cars);
            const res = await request(app).get("/cars");

            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);

        });
    })

});