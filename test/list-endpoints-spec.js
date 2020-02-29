const app = require("../src/app");
const knex = require("knex");

describe("/list", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => {
    return Promise.all([
      db.raw(`truncate table artlist restart identity cascade`)
    ]);
  });

  afterEach("cleanup", () => {
    return Promise.all([
      db.raw(`truncate table artlist restart identity cascade`)
    ]);
  });

  describe(`GET /list`, () => {
    context(`Given no items`, () => {
      it("responds with 200 and an empty array", () => {
        return supertest(app)
          .get("/list")
          .expect(200, []);
      });
    });
    context("Given there are notes in the database", () => {
      const testItems = [
        {
          id: 1,
          title: "Lahaina Fish",
          description: "a colorful green and purple fish",
          medium: "oil",
          location: "Maui Hands Lahaina",
          price: "2500",
          size: "30x40",
          availability: "Complicated"
        },
        {
          id: 2,
          title: "Honu",
          description: "a turtle in a sea of blue",
          medium: "mixed-media",
          location: "somewhere in Canada",
          price: "450",
          size: "16x24",
          availability: "Unavailable"
        },
        {
          id: 3,
          title: "Makawao Fish",
          description: "a fish of the mountain",
          medium: "mixed-media",
          location: "the Lahaina office",
          price: "5000",
          size: "40x40",
          availability: "Available"
        },
        {
          id: 4,
          title: "Haleakala",
          description: "A giant volcano that looks like a mountain",
          medium: "acrylic",
          location: "on the mountain",
          price: "3000",
          size: "20x16",
          availability: "Available"
        }
      ];

      beforeEach("insert items", () => {
        return db.into("artlist").insert(testItems);
      });

      it("GET /lsit responds with 200 and all items", () => {
        return supertest(app)
          .get("/list")
          .expect(200, testItems);
      });
    });
  });
});
