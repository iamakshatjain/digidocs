const express =  require("express");
const router = express.Router();
const passport = require("passport");
const localStrategy = require("passport-local");

const User = require("../models/user");

router.get("/login",(req,res) => {
	res.render("login");
});

router.post("/login",	
	passport.authenticate('local', { 
 		failureRedirect: '/login' 
 	}),(req,res) => {
		console.log("login by:");//redirects to the docs only on login
		console.log(req.user.username);
		res.redirect("/user/docs/"+req.body.username);
 	});

router.get("/register", (req,res) => {
	res.render("register");
});

router.post("/register", (req,res) => {
	User.register(new User({username : req.body.username}),req.body.password,(err,user) => {
		if(err){
			console.log(err);
			res.redirect("/register");
		}
		else{
			passport.authenticate("local", (req,res) => {
				res.redirect("/user/docs/"+req.body.username);
				console.log("user registered : ");
				console.log(req.user.username);
			});
		}
	});
});

router.get("/logout",(req,res) => {
	console.log("user logged out : "+req.user.username);
	req.logout();
	res.redirect("/");
});

module.exports = router;
