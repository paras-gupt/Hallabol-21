const express  = require("express");
var router = express.Router()
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
app.use("/", router);

//Google Authentication Library
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '502067726700-5b2vgau8ntkvk4iu767m8b1eed7ec8t1.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

var user = {};
var lastvisitedroute = "/";
var loginclick = false;
router.get("/", async (req,res) => {
    if (req.user != null){user = req.user};
    // console.log(user.name);
    if(loginclick == false){
        res.render("index", {user: user});
    } else{
        loginclick = false;
        res.redirect(lastvisitedroute);
    }
    
});

router.get("/login", (req,res) => {
    loginclick = true;
    res.render("login");
}); 

router.post("/login", (req,res) => {
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
 
router.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    user = {};
    loginclick = false;
    res.redirect('/');
}) 
 
router.get("/futsal" , async(req,res) => {
    lastvisitedroute = '/futsal';
    if (req.user != null){user = req.user};
    res.render("futsal", {user: user});
});

router.get("/futsal-register" , checkAuthenticated, async(req,res) => {
    lastvisitedroute = '/futsal-register';
    if (req.user != null){user = req.user};
    res.render("futsal-register", {user:user});
});

router.get("/4-a-side-baddy" , async(req,res) => {
    lastvisitedroute = '/4-a-side-baddy';
    if (req.user != null){user = req.user};
    res.render("4-a-side-baddy", {user: user});
});

router.get("/4-a-side-baddy-register" , checkAuthenticated, async(req,res) => {
    lastvisitedroute = '/4-a-side-baddy-register';
    if (req.user != null){user = req.user};
    res.render("4-a-side-baddy-register", {user:user});
});

router.get("/carrom" , async(req,res) => {
    lastvisitedroute = '/carrom';
    if (req.user != null){user = req.user};
    res.render("carrom", {user: user});
});

router.get("/carrom-register" , checkAuthenticated, async(req,res) => {
    lastvisitedroute = '/carrom-register';
    if (req.user != null){user = req.user};
    res.render("carrom-register", {user:user});
});

router.get("/dodgeball" , async(req,res) => {
    lastvisitedroute = '/dodgeball';
    if (req.user != null){user = req.user};
    res.render("dodgeball", {user: user});
});

router.get("/dodgeball-register" , checkAuthenticated, async(req,res) => {
    lastvisitedroute = '/dodgeball-register';
    if (req.user != null){user = req.user};
    res.render("dodgeball-register", {user:user});
});

router.get("/foot-volley" , async(req,res) => {
    lastvisitedroute = '/foot-volley';
    if (req.user != null){user = req.user};
    res.render("foot-volley", {user: user});
});

router.get("/foot-volley-register" , checkAuthenticated, async(req,res) => {
    lastvisitedroute = '/foot-volley-register';
    if (req.user != null){user = req.user};
    res.render("foot-volley-register", {user:user});
});

router.get("/frisbee" , async(req,res) => {
    lastvisitedroute = '/frisbee';
    if (req.user != null){user = req.user};
    res.render("frisbee", {user: user});
});

router.get("/frisbee-register" , checkAuthenticated, async(req,res) => {
    lastvisitedroute = '/frisbee-register';
    if (req.user != null){user = req.user};
    res.render("frisbee-register", {user:user});
});

router.get("/gully-cricket" , async(req,res) => {
    lastvisitedroute = '/gully-cricket';
    if (req.user != null){user = req.user};
    res.render("gully-cricket", {user: user});
});

router.get("/gully-cricket-register" , checkAuthenticated, async(req,res) => {
    lastvisitedroute = '/gully-cricket-register';
    if (req.user != null){user = req.user};
    res.render("gully-cricket-register", {user:user});
});

router.get("/kho-kho" , async(req,res) => {
    lastvisitedroute = '/kho-kho';
    if (req.user != null){user = req.user};
    res.render("kho-kho", {user: user});
});

router.get("/kho-kho-register" , checkAuthenticated, async(req,res) => {
    lastvisitedroute = '/kho-kho-register';
    if (req.user != null){user = req.user};
    res.render("kho-kho-register", {user:user});
});

router.get("/seven-stones" , async(req,res) => {
    lastvisitedroute = '/seven-stones';
    if (req.user != null){user = req.user};
    res.render("seven-stones", {user: user});
});

router.get("/seven-stones-register" , checkAuthenticated, async(req,res) => {
    lastvisitedroute = '/seven-stones-register';
    if (req.user != null){user = req.user};
    res.render("seven-stones-register", {user:user});
});

router.get("/throwball" , async(req,res) => {
    lastvisitedroute = '/throwball';
    if (req.user != null){user = req.user};
    res.render("throwball", {user: user});
});

router.get("/throwball-register" , checkAuthenticated, async(req,res) => {
    lastvisitedroute = '/throwball-register';
    if (req.user != null){user = req.user};
    res.render("throwball-register", {user:user});
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