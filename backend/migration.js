const createTable = [
" CREATE TABLE usertable (id int4 NOT NULL, username varchar NOT NULL, passwordhash varchar NOT NULL, userrole varchar NOT NULL);",
  " CREATE TABLE tests (id int4 NOT NULL, username varchar NOT NULL, answers json NOT NULL, question json NOT NULL, testdate json NOT NULL, minutes int4 NOT NULL, title varchar NOT NULL);",
  " CREATE TABLE startedtest (id int4 NOT NULL, username varchar NOT NULL, startedtest int4 NOT NULL, testid int4 , bodovi float8 );",
  " CREATE TABLE results (id int4 NOT NULL, username varchar NOT NULL, points int4 NOT NULL, nazivtesta varchar , idtesta int4 NOT NULL);",
  " CREATE TABLE questions (id int4 NOT NULL, group_id int4 NOT NULL, points int4 NOT NULL, negativepoints int4 NOT NULL, qtext varchar NOT NULL, answers varchar NOT NULL, question varchar NOT NULL);",
" CREATE TABLE grouptable (id int4 NOT NULL, groupname varchar NOT NULL, username varchar NOT NULL);"    
]
const express = require("express");
const app = express();
const port = 80;
const { Client } = require("pg");


app.get("/", (req, res) => {
  const client = new Client({
    connectionString:
     "",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    for( let a of  createTable) {
    await client.query(a);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
  res.send("Hello World!");
});

var https = require("https");
var fs = require("fs");
var options = {
  key: fs.readFileSync("./privatekey.pem"),
  cert: fs.readFileSync("./server.crt"),
};

https.createServer(options, app).listen(443);
