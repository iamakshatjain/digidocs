const express =  require("express");
const router = express.Router();
const passport = require("passport");

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

router.get("/docs/:username",checkAuthentication,(req,res) => {
	console.log("docs : "+req.params.username);
	res.render("profile");
});

module.exports = router;