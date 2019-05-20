// Node.js + Express server backend for petsapp
// v2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// COGS121 by Philip Guo
// https://github.com/pgbovine/COGS121

// run this once to create the initial database as the goalDigger.db file
//   node create_database.js

// to clear the database, simply delete the pets.db file:
//   rm goalDigger.db

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('goalDigger.db');

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE users_to_goalDigger (name TEXT, password TEXT, points INTEGER)");
  // db.run("CREATE TABLE user_points (name TEXT, points TEXT)");

// insert 3 rows of data:
  db.run("INSERT INTO users_to_goalDigger VALUES ('Nataliya', '123456', '0')");
  db.run("INSERT INTO users_to_goalDigger VALUES ('Emi', '234567',0)");
  db.run("INSERT INTO users_to_goalDigger VALUES ('Matthias', '345678',0)");
  db.run("INSERT INTO users_to_goalDigger VALUES ('Kristen', '456789', 0)");
  // db.run("INSERT INTO user_points VALUES ('Emi', '0')");

  console.log('successfully created the users_to_goalDigger table in goalDigger.db');

  // print them out to confirm their contents:
  // db.each("SELECT name, password FROM users_to_goalDigger", (err, row) => {
  //     console.log(row.name + ": " + row.password);
  // });
  db.each("SELECT name, points FROM users_to_goalDigger", (err, row) => {
      console.log(row.name + ": You have " + row.points + " points");
  });

});

db.close();
