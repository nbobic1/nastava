const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const { Client } = require("pg");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());
const cors = require("cors");
var session = require("express-session");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/logout", async (req, res) => {
  req.session.isLogedin = false;
  res.send("true");
});

app.post("/login", async (req, res) => {
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const resp = await client.query("SELECT * FROM usertable");
    console.log("resp", resp);
    var temp = true;
    for (var i of resp.rows) {
      if (
        i.username === req.body.username &&
        i.passwordhash === req.body.passwordhash
      ) {
        req.session.username = req.body.username;
        req.session.userRole = "dsf";
        console.log("zapisaooo");
        res.send(i.userrole);
        temp = false;
        break;
      }
    }
    if (temp) res.send("false");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
});

app.post("/register", async (req, res) => {
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(
      `INSERT INTO usertable(username,passwordhash,userRole) VALUES ($1,$2,$3)`,
      [req.body.username, req.body.passwordhash, req.body.userRole]
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
  res.send("ehej");
});

app.get("/getTests", async (req, res) => {
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const odgovor = await client.query(`SELECT * FROM tests`);
    const data = odgovor.rows;
    res.send(data);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
});

app.get("/getQuestions", async (req, res) => {
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const odgovor = await client.query(
      ` SELECT questions.* 
    FROM tests 
    INNER JOIN questions 
    ON questions.id::json IN (tests.question)
    WHERE tests.id = $1`,
      [req.query.id]
    );
    const data = odgovor.rows;
    res.send(data);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
});

app.get("/getGroups", async (req, res) => {
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const odgovor = await client.query(
      `SELECT
    t1.*,
    COUNT(t2.id) AS numQ
FROM
    grouptable t1
LEFT JOIN
    questions t2
ON
    t1.id = t2.group_id
    WHERE t1.username=$1'
GROUP BY
    t1.id; 
    `,
      [req.query.username]
    );
    const data = odgovor.rows;
    res.send(data);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
});

app.post("/startedTest", async (req, res) => {
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(
      `INSERT INTO startedtest(username,startedtest,testid) VALUES($1,$2,$3)`[
        (req.body.username, req.body.startedTest, req.body.testId)
      ]
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
});

app.post("/addPoints", async (req, res) => {
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(
      `INSERT INTO results(idtesta,nazivtesta,username,points) VALUES($1,$2,$3,$4)`,
      [
        req.body.idtesta,
        req.body.nazivTesta,
        req.body.username,
        req.body.points,
      ]
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
});

app.get("/getTestsForStudent", async (req, res) => {
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const odgovor = await client.query(` SELECT *
    FROM tests
    WHERE id NOT IN (SELECT testid FROM startedtest);
    `);
    const data = odgovor.rows;
    res.send(data);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
});

app.post("/makeGroup", async (req, res) => {
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(
      `INSERT INTO grouptable(groupname,username) VALUES($1,$2)`,
      [req.body.groupname, req.body.username]
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
  res.send("nice");
});

app.post("/makeTest", async (req, res) => {
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(
      `INSERT INTO tests(username,answers,question,testdate,title,minutes) VALUES($1,$2,$3,$4,$5,$6)`,
      [
        req.body.username,
        req.body.answers,
        req.body.question,
        req.body.date,
        req.body.nazivTesta,
        req.body.trajanjeTesta,
      ]
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
  res.send("nice");
});

app.post("/addQuestions", async (req, res) => {
  console.log(req.session.username, req.session.userRole);
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(
      `INSERT INTO questions(group_id,points,negativepoints,qtext,answers,question) VALUES($1,$2,$3,$4,$5,$6)`,
      [
        req.body.group_id,
        req.body.points,
        req.body.negativepoints,
        req.body.qtext,
        req.body.answers,
        req.body.question,
      ]
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
  res.send("nice");
});

app.post("/getQuestion", async (req, res) => {
  var query = `SELECT *
  FROM questions WHERE group_id = $1 ORDER BY random()
  LIMIT $2;`;
  /*for(i of req.body.ids)
query+=`${i},`
query=query.slice(0,-1)+`)  ORDER BY random()
  LIMIT 10;`
  */
  console.log("qurei", query);
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    var odgovor = await client.query(query, [req.body.id, req.body.num]);
    const data = odgovor.rows;
    res.send(data);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
});

app.post("/getRezults", async (req, res) => {
  var query = `SELECT * FROM results WHERE username = $1;`;
  const client = new Client({
    connectionString:
      "postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    var odgovor = await client.query(query, [req.body.username]);
    const data = odgovor.rows;
    res.send(data);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
});

var https = require("https");
var fs = require("fs");
var options = {
  key: fs.readFileSync("./privatekey.pem"),
  cert: fs.readFileSync("./server.crt"),
};

https.createServer(options, app).listen(443);
