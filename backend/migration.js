const createTable = [
" CREATE TABLE usertable (id SERIAL, username varchar , passwordhash varchar, userrole varchar );",
  " CREATE TABLE tests (id SERIAL, username varchar , answers json , question json, testdate json , minutes int4 , title varchar );",
  " CREATE TABLE startedtest (id SERIAL, username varchar , startedtest int4 , testid int4 , bodovi float8 );",
  " CREATE TABLE results (id SERIAL, username varchar , points int4, nazivtesta varchar , idtesta int4 );",
  " CREATE TABLE questions (id SERIAL, group_id int4 , points int4 , negativepoints int4 , qtext varchar , answers varchar , question varchar);",
" CREATE TABLE grouptable (id SERIAL, groupname varchar , username varchar );"    
]
const express = require("express");
const app = express();
const port = 80;
const { Client } = require("pg");


app.get("/", async (req, res) => {
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
