const express = require('express')
const app = express()
const port = 3000
const  { Client } =require('pg')
var bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json())
const cors = require('cors');
var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))
app.use(cors({
  origin: ['http://127.0.0.1:5173','http://localhost:5173'],
  credentials:true
}));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/logout',async(req,res)=>{
req.session.isLogedin=false
res.send('true')
})
app.post('/login',async(req,res)=>{
  const client = new Client({connectionString:'postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb',ssl:{rejectUnauthorized:false}})
	await client.connect()
	try {
    const resp = await client.query('SELECT * FROM usertable');
    var temp=true
    for(var i of resp.rows)
    {
      if(i.username===req.body.username&&i.passwordhash===req.body.passwordhash)
      {
        req.session.username=req.body.username
        req.session.userRole='dsf'
        console.log('zapisaooo')
        res.send('true')
        temp=false;
        break;
      }
    }
  if(temp)
  res.send('false')
  }  catch (err) {
	console.error(err);
	} finally {
	await client.end()
	}
})

app.post('/register',async(req,res)=>{
  const client = new Client({connectionString:'postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb',ssl:{rejectUnauthorized:false}})
	await client.connect()
	try {
   await client.query(`INSERT INTO usertable(username,passwordhash,userRole) VALUES ('${req.body.username}','${req.body.passwordhash}','${req.body.userRole}')`);
  }  catch (err) {
	console.error(err);
	} finally {
	await client.end()
	}
  res.send('ehej')
})

app.get('/getGroups', async(req, res) => {
  const client = new Client({connectionString:'postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb',ssl:{rejectUnauthorized:false}})
  await client.connect()
  try{
    const odgovor = await client.query(`SELECT * FROM grouptable`);
    const data = odgovor.rows;
    console.log("Odogovr je " + JSON.stringify(odgovor.rows))
    res.send(data);
  } catch(err){
    console.log(err);
  } finally{
    await client.end()
  }
})

app.post('/makeGroup', async(req, res) => {
  console.log(req.session.username,req.session.userRole)
  const client = new Client({connectionString:'postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb',ssl:{rejectUnauthorized:false}})
  await client.connect()
  try{
    await client.query(`INSERT INTO grouptable(groupname) VALUES('${req.body.groupname}')`)
  } catch(err){
    console.log(err);
  } finally{
    await client.end()
  }
 res.send('nice')
 /*
  const client = new Client({connectionString:'postgres://nbobic1:zgRI3cjOTKi8@ep-spring-recipe-95572208.eu-central-1.aws.neon.tech/neondb',ssl:{rejectUnauthorized:false}})
  await client.connect()
  try{
    await client.query(`INSERT INTO grouptable(groupname, question, points, negativepoints, answer) VALUES('${req.body.groupname}','${req.body.question}','${req.body.points}','${req.body.negativepoints}','${req.body.answer}')`)
  } catch(err){
    console.log(err);
  } finally{
    await client.end()
  }
  */
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})