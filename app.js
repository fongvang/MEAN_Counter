var express  = require('express');
var app = express();
var session = require('express-session');

app.use(express.static(__dirname + "/static/images"));
app.use(express.static(__dirname + "/static/style"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(session({
    secret: "Hey, this is a secret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 6000}
}));
// ------Routes && URL Locations Below-----
app.get('/', function(req, res){
    if (!req.session.count){
        req.session.count = 1;
    }
    console.log("Session Count: " + req.session.count);
    res.render('index', {count: req.session.count});
});

app.get('/add1', function(req, res){
    if(req.session.count != undefined){
        req.session.count += 1;
        console.log('added 1 to session');
    }
    res.redirect('/');
})

app.get('/add2', function(req, res){
    if(req.session.count != undefined){
        req.session.count += 2;
        console.log('added 2 to session');
    }
    res.redirect('/');
})

app.get('/delete', function(req, res){
    if(req.session.count != undefined){
        req.session.count = 1;
        console.log('reset session to 1');
    }
    res.redirect('/');
})

//-------Port Listener------
app.listen(8000, function(req, res){
    console.log("Now serving on localhost:8000");
});