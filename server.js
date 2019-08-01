const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//comments added
var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
   var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
       console.log(err); 
    });
    next();
});
app.use((req, res, next) => { //if you won't call next nothing after this function will be executed, app.use will be executed from top to bottom
    res.render('maintenence.hbs');
    //next();
});


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
 