const express  = require("express");
const ejs = require('ejs');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const app = express(); 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('views', './public/views');
app.set ("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());

//Google Authentication Library
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '473236609433-9gom3rgoo2h0iacdpqo5e9hqt6hqa00k.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

var user = {};
var lastvisitedroute = "/";
var loginclick = false;
app.get("/", async (req,res) => {
    if (req.user != null){user = req.user};
    // console.log(user.name);
    if(loginclick == false){
        res.render("index", {user: user});
    } else{
        loginclick = false;
        res.redirect(lastvisitedroute);
    }
    
});

app.get("/login", (req,res) => {
    loginclick = true;
    res.render("login");
}); 

app.post("/login", (req,res) => {
    let token = req.body.token;
    //console.log(token);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
        const userid = payload['sub'];
        //console.log(payload);
    }
    verify().then(() => {
        res.cookie('session-token', token);
        res.send('success');
        req.user = user;
    }).catch(console.error);
});

app.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    user = {};
    loginclick = false;
    res.redirect('/');
}) 
 
app.get("/futsal" , async(req,res) => {
    lastvisitedroute = '/futsal';
    if (req.user != null){user = req.user};
    res.render("futsal", {user: user});
});

app.get("/futsal-register" , checkAuthenticated, async(req,res) => {
    lastvisitedroute = '/futsal-register';
    if (req.user != null){user = req.user};
    res.render("futsal-register", {user:user});
});

//Function to check whether the user is authenticated or not.
function checkAuthenticated(req, res, next){
    let token = req.cookies['session-token'];
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, 
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
    verify()
    .then(()=>{
        req.user = user;
        next();
    })
    .catch(err=>{
        res.redirect('/login');
    })
}

app.listen(process.env.PORT || 3000, function (){
    console.log("Server running");
});