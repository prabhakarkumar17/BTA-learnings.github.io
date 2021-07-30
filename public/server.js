const express = require('express');
var bodyParser = require('body-parser')
var alert = require('alert')
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const path = require('path');
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: '3.108.42.23',
    user: 'dbuser',
    password: 'password',
    database: 'bta_database'
})

connection.connect(function (err) {
    if (err) throw err;
    
    console.log('Connected...');
})

//post method for submit form
app.post('/submit', function (request, response) {

    var query = "insert into feedback (first_name, last_name, email, message) values ('"+ request.body.first_name +"', '"+ request.body.last_name +"', '"+ request.body.email +"', '"+ request.body.message +"')";
    connection.query(query, function (error) {
        if (error) throw error;
        
        response.redirect("http://localhost:8000/contact.html");
        //response.redirect('/');
    
    })
    
})

app.get('/feedback', function (req, res) {
    connection.query("SELECT * FROM feedback", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
    // res.render('index', {
    //     data: results
    // });
    
});

app.get('/reference', function (req, res) {
    connection.query("SELECT * FROM reference", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/', (request, response) => {
    response.sendFile(
        path.join(
            __dirname + '/index.html'
        )
    );
});

app.get('/:id', (request, response) => {
    const id = request.params.id;

    response.sendFile(
        path.join(
            __dirname + '/' + id
        )
    )
})

app.get('/:idd/:id', (request, response) => {
    const id = request.params.id;
    const idd = request.params.idd;

    response.sendFile(
        path.join(
            __dirname + '/' + idd + '/' + id 
        )
    );
});

app.listen(8000, (request, response) => {
    console.log("Server has started");
});

//step1:terminal open , then write node server,
//step 2: in brouser write http://localhost:8000