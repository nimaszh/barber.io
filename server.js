
const path = require('path');
const express = require('express')
const Pool = require("pg").Pool
const cors = require("cors");

const app = express();
app.use(express.json()); //req.body
app.use(cors());




app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});




const pool = new Pool({
    user: "postgres",
    password: "nima702646",
    host: "localhost",
    port: 5432,
    database: "barber"
  });


function timeGenerator(date) {
    const timeList = ['09:00:00','10:00:00','11:00:00','12:00','13:00','14:00','16:00','17:00','18:00','19:00'];
    timeList.map(time =>{
        console.log(time)
        pool.query(
            'INSERT INTO masood(time, date) VALUES($1, $2)',
            [time,date],
        )
        })
        
}
function dateGenerator(day) {
    const now = new Date()
    now.setDate(now.getDate() + day)
    const nowString = now.toISOString()
    const result = nowString.substr(0,10)
    return result
}

app.get('/adminmasoodtable', (request,response) => {
    pool.query('SELECT id,time,date,usernumber,username,available FROM masood WHERE date=$1 OR date=$2 OR date=$3 OR date=$4 OR date=$5 OR date=$6 OR date=$7 ORDER BY date,time ASC', [dateGenerator(0), dateGenerator(1),dateGenerator(2),dateGenerator(3),dateGenerator(4),dateGenerator(5),dateGenerator(6) ])
        .then(res => {response.json(res.rows)})
        .catch(e => console.error(e.stack))  
})


app.put('/adminmasoodreserve', (request,response) => {
    const {id,changeTo} = request.body
    pool.query('UPDATE masood SET available=$1 WHERE id=$2',[changeTo,id])
        .then(response.json('done'))
        .catch(e => console.error(e.stack))
})




app.post('/masoodtable', (request,response) => {
    const {value} = request.body
    const example = dateGenerator(value)
    pool.query('SELECT id,time, available FROM masood WHERE date=$1 ORDER BY time ASC', [example])
        .then(res => {response.json(res.rows)})
        .catch(e => console.error(e.stack))
    

    
})




app.put('/masoodreserve', (request,response) => {
    const {id,name,number} = request.body
    pool.query('UPDATE masood SET available=$1, username=$2, usernumber=$3 WHERE id=$4',[false,name,number,id])
        .then(response.json('done'))
        .catch(e => console.error(e.stack))
})

app.get('/', (req, res) => {
    res.send('this is working');
})

app.post('/signin',(req, response) => {
    const {number, password} = req.body

    pool
        .query('SELECT * FROM users WHERE number = $1 ', [number])
        .then(res =>{ if(password === res.rows[0].password){
                        response.json(res.rows[0])
        } else {
            response.json('WRONG')
        }
    })
        .catch(e => console.error(e.stack))
} )

app.post('/register', (request, response, next) => {
    const { name, number, password } = request.body;
   
    pool.query(
     'INSERT INTO users(name, number, password) VALUES($1, $2, $3) RETURNING *',
     [name, number,password],
     (err, res) => {
        if (err){
            response.json('Cant do it,try with valueable informations')
        } else {
            // const {name, number} = res.rows[0]
            response.json(res.rows[0])
        }   
     }
    )
   });





console.log(dateGenerator(4))
console.log(dateGenerator(4))
// var rightNow = new Date();
// var res = rightNow.toISOString().slice(0,10).replace(/-/g,"")



app.listen(3000,() => {
    console.log('app is running on port 3000')
})