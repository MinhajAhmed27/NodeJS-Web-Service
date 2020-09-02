const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.set("view engine","ejs"); 
app.use(bodyParser.urlencoded({extended:true}));
var seedDB = (require("./seeds"));
var mongoose = require('mongoose');
var Comment = require("./models/comment");
seedDB();
var Campground = require("./models/campground")
mongoose.connect('mongodb://localhost/yelpcamp',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

// let campground = [
//     {name:"Pahar ganjh", image:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872__340.jpg"},
//     {name:"Sakhar", image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
//     {name:"Cholistan", image:"https://cdn.pixabay.com/photo/2017/08/06/18/33/barn-2594975__340.jpg"},
//     {name:"Gilgit", image:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__340.jpg"},
//     {name:"Norhten",image:"https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092__340.jpg"},
//     {name:"Pahar ganjh", image:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872__340.jpg"},
//     {name:"Sakhar", image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
//     {name:"Cholistan", image:"https://cdn.pixabay.com/photo/2017/08/06/18/33/barn-2594975__340.jpg"}  
// ]

app.get("/",function(req,res){
    res.render('landing');
});

// INDEX - show all campgrounds
app.get("/campground",(req,res) => {
    // get all the campgrounds
    Campground.find({},function(err,allCamps){
        if(err){
            console.log("there is an error")
            console.log(err);
        }else{
            res.render("campgrounds/index",{campground:allCamps});
        }
    });
});
// NEW - show form to create new campground
app.get("/campground/new",(req,res) => {
    res.render('campgrounds/new')
});

// SHOW - more info of selected 
app.get("/campground/:id",(req,res) => {
    Campground.findById(req.params.id).populate("comment").exec(function(err,foundCamp){
        if(err){
            console.log("there is an error")
            console.log(err);
        }else{
            console.log(foundCamp)
            res.render("campgrounds/show",{campground:foundCamp});
        }
    })
});
// CREATE - add new camps
app.post("/campground",(req,res) => {
    // get data from form and add to campground array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    newCamp = {name:name,image:image,description:description};
    // create a new camp and save to DB
    Campground.create(newCamp,function(err,campground){
            if(err){
                console.log(err)
            }else{
                // redirect back to campground page
                res.redirect('campgrounds/campground');
            }
    });
    
});

// =====================================
// COMMENTS ROUTES
// =====================================

// NEW  campground/:id/comment/new  GET
// CREATE   campground/:id/comment  POST

app.get("/campground/:id/comment/new",function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new",{campground:campground});
        }
    })
})
// CREATE   campground/:id/comment  POST
app.post("/campground/:id/comment",function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err)
                }else{
                    campground.comment.push(comment);
                    campground.save();
                    res.redirect("/campground/"+campground._id);
                }
            });
        }
    })
})

app.listen(3000,function(){
    console.log("Yelp Camp Server Started")
});