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
      db.raw(`truncate table list restart identity cascade`)
    ]);
  });

  afterEach("cleanup", () => {
    return Promise.all([
      db.raw(`truncate table list restart identity cascade`)
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
    context("Given there are items in the database", () => {
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
        return db.into("list").insert(testItems);
      });

      it("GET /lsit responds with 200 and all items", () => {
        return supertest(app)
          .get("/list")
          .expect(200, testItems);
      });
    });
  });
  describe(`GET /list/:item_id`, () => {
    context(`Given no items`, () => {
      it(`responds with 404`, () => {
        const itemId = 123456;
        return supertest(app)
          .get(`/list/${itemId}`)
          .expect(404, { error: { message: `item doesn't exist` } });
      });
    });

    context("Given there are items in the database", () => {
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

      beforeEach("insert notes", () => {
        return db.into("list").insert(testItems);
      });

      it("GET /list/:item_id responds with 200 and the specified item", () => {
        const itemId = 2;
        const expectedItem = testItems[itemId - 1];
        return supertest(app)
          .get(`/list/${itemId}`)
          .expect(200, expectedItem);
      });

      it("DELETE /list/:item_id responds with 204 and the item is deleted", () => {
        const itemId = 3;
        const expectedItems = testItems.filter(item => item.id !== itemId);
        return supertest(app)
          .delete(`/list/${itemId}`)
          .expect(204)
          .then(res => {
            return supertest(app)
              .get(`/list`)
              .expect(200, expectedItems);
          });
      });
    });
  });

  describe(`POST /list`, () => {
    it(`creates an item, responding with 201 and the new item`, function() {
      const newItem = {
        title: "New Test",
        description: "This is a description for a new test",
        availability: "Unavailable"
      };

      return supertest(app)
        .post("/list")
        .send(newItem)
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql(newItem.title);
          expect(res.body).to.have.property("id");
        });
    });
  });
});
