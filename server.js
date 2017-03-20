'use strict';

// ran 'npm init'
// require express and set it to 'app'
const pg = require('pg');
const fs = require('fs'); //what does this line do?
const express = require('express');
const app = express();

// NEW 03-19: Require in body-parser for post requests in our server - what is this and why do it?
const bodyParser = require('body-parser');
// set PORT to either user environment or 3000
const PORT = process.env.PORT || 3000;
console.log(process.env);

// Connection string for postgres database
const conString = 'postgres://localhost:5432';

// Pass conString to pg, which creates new client object
const client = new pg.Client(conString);

// Connect client object to DB
client.connect();

// Install the middleware plugins; make app aware and able to use body-parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use to include all static resources - use express.static
app.use(express.static('./public'));

// Routes for requesting HTML resources
app.get('/', function (request, response) {
  response.sendFile('index.html', { root: '.' });
});

// Routes for making API calls to use CRUD operations on DB
app.get('/portfolio', function (request, response) {
  client.query('SELECT * FROM articles')
    .then(function (results) {
      response.send(results.rows);
    })
    .catch(function (err) {
      console.log(err);
    })
});

// Insert into tables
app.post('/portfolio', function(request, response) {
  client.query(
    `INSERT INTO
    portfolio(title, author, "authorURL", category,"publishedOn", body)
    VALUES ($1, $2, $3, $4, $5, $6);`,
    [
      request.body.title,
      request.body.author,
      request.body.authorURL,
      request.body.category,
      request.body.publishedOn,
      request.body.body
    ]
  )
  .then(function() {
    response.send('insert complete');
  })
  .catch(function(err){
    console.log(err);
  })
});

// Updates the articles
app.put('portfolio/:id', function(request, response) {
  client.query(
    `UPDATE portfolio
    SET title=$1, author=$2, "authorURL"=$3, category=$4, "publishedOn"=$5, body=$6
    WHERE article_id=$7;`,
    [
      request.body.title,
      request.body.author,
      request.body.authorURL,
      request.body.category,
      request.body.publishedOn,
      request.body.body,
      request.params.id
    ]
  )
  .then(function() {
    response.send('update complete');
  })
  .catch(function(err) {
    console.log(err);
  })
});

// Delete one specific project by id
app.delete('/portfolio/:id', function(request, response) {
  client.query(
    `DELETE FROM portfolio WHERE portfolio_id=$1;`,
    [request.params.id]
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

// Delete the entire database
app.delete('/portfolio', function(request, response) {
  client.query(
    'DELETE FROM portfolio;'
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

// initial database load function call
loadDB();

//app.listen to log a console message telling me what PORT is up.
app.listen(PORT, function () {
  console.log(`Server set to ${PORT}`);
});

//////// ** DATABASE LOADER ** ////////
function loadArticles() {
  client.query('SELECT COUNT(*) FROM portfolio')
    .then(results => {
      if (!parseInt(results.rows[0].count)) {
        fs.readFile('./public/data/portfolio-data.json', (err, fd) => {
          if (err) return console.error(err);
          JSON.parse(fd.toString()).forEach(ele => {
            client.query(`
            INSERT INTO
            portfolio(title, author, "authorURL", category,"publishedOn", body)
            VALUES ($1, $2, $3, $4, $5, $6);`,
            [ele.title, ele.author, ele.authorURL, ele.category, ele.publishedOn, ele.body]
            )
          })
        })
      }
    })
}

function loadDB() {
  client.query(`
  CREATE TABLE IF NOT EXISTS portfolio (
    portfolio_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    "authorURL" VARCHAR (255),
    category VARCHAR(20),
    "publishedOn" DATE,
    body TEXT NOT NULL);`
  )
  .then(function() {
    loadArticles();
  })
  .catch(function(err) {
    console.log(err);
  })
}