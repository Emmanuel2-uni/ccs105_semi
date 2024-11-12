//instantiation
const express = require("express")
const app = express()

const mysql =  require("mysql")
const moment = require("moment")

const PORT = process.env.PORT || 5001

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl} : ${moment().format()}`)
    next();
}

app.use(logger);


const connection =  mysql.createConnection({
    host: "bf3t7c34bdext5lysjsz-mysql.services.clever-cloud.com",
    user: "uaidw5th30rttlwp",
    password: "RrJBOPEF7kMb3TAqi3H4",
    database: "bf3t7c34bdext5lysjsz",
});

connection.connect();

//REPORT - CRUD
app.get("/api/members", (req, res) => {

    connection.query("SELECT * FROM products", (err, rows, fields) => {
        if(err) throw err;
        res.json(rows)

    })
})

//REPORT - CRUD - SEARCH
app.get("/api/members/:id", (req, res) => {
    const id = req.params.id
    //const first_name = req.params.first_name
    //res.send(id)
    //res.send(first_name)
    connection.query(`SELECT * FROM products WHERE id = ${id}`, (err, rows, fields) => {
        if(err) throw err;
        if(rows.length > 0){
            res.json(rows)
        }else{
            res.status(400).json({msg:`${id} id not found`})
        }
    })

})

//POST - CREATE - CRUD
app.use(express.urlencoded({extended: false}))
app.post("/api/members", (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const gender = req.body.gender;
    const id = req.body.id;
    
    connection.query(`INSERT INTO products (first_name, last_name, email, gender) VALUES ('${fname}', '${lname}', '${email}', '${gender}')`, (err, rows, fields) => {
        if(err) throw err;
        res.json({msg: `Successfully inserted`})
    })

})


//POST - CREATE - CRUD
app.use(express.urlencoded({extended: false}))
app.put("/api/members", (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const gender = req.body.gender;
    const id = req.body.id;

    connection.query(`UPDATE product SEt first_name='${fname}', last_name='${lname}', email='${email}', gender='${gender}' WHERE id='${id}'`, (err, rows, fields) => {
        if(err) throw err;
        res.json({msg: `Success`})
    })

})
    

// DELETE
app.use(express.urlencoded({extended: false}))
app.delete("/api/members", (req, res) => {

    const id = req.body.id
    connection.query(`DELETE FROM products WHERE id = '${id}'`, (err, rows, fields) => {
        if(err) throw err;
        res.json({msg: `Successfully yeeted`})

    })

})

app.listen(5001, () => {
    console.log(`Server is running in port ${PORT}`);
})
