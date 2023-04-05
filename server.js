const { error } = require("console");
const express = require("express");
const path = require("path");
const Request = require("request");
const { Script } = require("vm");
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');
const web3 = require('web3');


const app = express();


app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + "/public", {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));

// app.get("/", (req, res) => {

//     res.sendFile(path.join(__dirname + "/index2.html"));
    

// })
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname + "/login.html"));
    

});
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {


        // Check if user exists

        if (username === '1234' && password, '1234') {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/index');
        } else {
            res.render('login.html', { message: 'Invalid username or password' });
        }
    } else {
        res.render('login.html', { message: 'Please enter username and password' });
    }
});
app.get('/index', (req, res) => {
    if (req.session.loggedin) {
        res.render('index.html', { username: req.session.username });
        
    } else {
        res.redirect('/');
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});





app.get("/prices", (req, res) => {

    res.sendFile(path.join(__dirname + "/prices.html"));
    

});



// serving the index.html file 

const server = app.listen(8000);
const portNumber = server.address().port;
console.log(`port: ${portNumber}`);
// can see the port number in terminal - you can dictate the port number