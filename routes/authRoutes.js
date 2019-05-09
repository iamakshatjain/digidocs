const express =  require("express");
const router = express.Router();
const passport = require("passport");
const localStrategy = require("passport-local");

const User = require("../models/user");
const checkAuthentication = (req,res,next) => {
	if(req.isAuthenticated()){
		if(req.user.username == req.params.username)//only the specified user must be allowed
			next();//continue
		else
			res.redirect("/login");
	}
	else{
		res.redirect("/login");
	}
}

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
			passport.authenticate("local")(req,res,() => {
				console.log("user registered : ");
				console.log(req.user.username);
				res.redirect("/user/docs/"+req.body.username);
			});
		}
	});
});

//todo:this logs back in on going back after the logout
router.get("/logout",(req,res) => {
	console.log("user logged out : "+req.user.username);
	req.logout();
	res.redirect("/");
});

module.exports = router;
