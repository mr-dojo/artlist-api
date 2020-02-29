# Artlist API

This API stores and serves artwork entries from a database

## Endpoints

- GET `/list` returns all items from the artlist database

## Scripts

- Start the application `npm start`
- Start nodemon for the application `npm run dev`
- Run the tests `npm test`
- Migrate `npm run migrate`
- Migrate Test `npm run migrate:test`

Seeding databases

- Seed artlist `psql -U dunder_mifflin -d artlist -f ./seeds/seed.artlist.sql`
- Seed artlist-test `psql -U dunder_mifflin -d artlist-test -f ./seeds/seed.artlist.sql`

## Deploying

Add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
