const express =  require("express");
const router = express.Router({mergeParams:true});
const passport = require("passport");
const mongoose = require("mongoose");

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

const Documents = ["Aadhaar Card","Driving Liscence","PAN Card","Ration Card","Passport","Birth Certificate","Arms Licsence","BPL Certificate","Transfer Certificate","Identity Card","Green Card"];//since not actual documents are uploaded
//else this could be array of objects(documents)

router.get("/docs/:username",checkAuthentication,(req,res) => {
	console.log("docs : "+req.params.username);
	User.findOne({username:req.params.username},(err,foundUser) => {
		if(err){
			console.log(err);
			res.send("User Not Found");
		}
		else{
			var docs=[];
			for(let doc of Documents){
				if(notin(doc,foundUser.documents))
					docs.push(doc);
			}
			console.log(docs);
			res.render("profile",{uploadedDocs:foundUser.documents,Documents:docs});
			console.log("found the User");
		}
	});
	//here the documents array must take only non-uploaded ones
	
});

router.post("/docs/:username",(req,res) => {
	User.findOne({username:req.params.username},(err,foundUser) => {
		if(err){
			console.log(err);
			res.send("User Not Found");
		}
		else{
				if(req.body.documents!=null){
					for(let doc of req.body.documents){
						foundUser.documents.push(doc);
					}
				}
					
				foundUser.save((err)=>{
					if(err){
						console.log(err);
					}
					else{
						console.log(foundUser);
						console.log("user documents updated");
						res.redirect("/user/docs/"+req.params.username);
					}
				});
				
			}
	});
	
});


const notin = (doc,docs) => {
	flag=true;
	for(i of docs){
		if(i==doc){
			flag=false;
			return flag;
		}
	}
	return flag;
}
module.exports = router;