const express = require('express')
const app = express()
const port = 3000
const  { Client } =require('pg')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors');

app.use(cors({
  origin: 'http://127.0.0.1:5173',
}));
app.get('/', (req, res) => {
  res.send('Hello World!')
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})