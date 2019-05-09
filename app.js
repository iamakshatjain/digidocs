const express = require("express"),
 	app = express(),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	mongoose = require("mongoose"),
	expressSession = require("express-session"),
	bodyParser = require("body-parser"),
	dotenv = require("dotenv");

const User = require("./models/user");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect(process.env.LDATABASEURL,{useNewUrlParser:true});

app.use(expressSession({
	secret:"digidocs",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
	res.locals.currentUser = req.user;
	next(); 
});

app.get("/", (req,res) => {
	res.send("this is going great sir");
});

app.use("/user",userRoutes);
app.use(authRoutes);

app.listen(process.env.PORT || 3000,process.env.IP,() => {
	console.log("working fine sir ... ");
});

