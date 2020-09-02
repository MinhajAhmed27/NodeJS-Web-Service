var mongoose = require("mongoose");
var Campground = require("./models/campground")
var Comment = require("./models/comment");

var data = [
    {
        name:"Pahar ganjh",
        image:"https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092__340.jpg",
        description:"bla bla bla"
    },
    {
        name:"Sakhar",
        image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg",
        description:"bla bla bla"
    },
    {
        name:"Cholistan",
        image:"https://cdn.pixabay.com/photo/2017/08/06/18/33/barn-2594975__340.jpg",
        description:"bla bla bla"
    }
]
// let data = [
//     {name:"Pahar ganjh", image:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872__340.jpg"},
//     {name:"Sakhar", image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
//     {name:"Cholistan", image:"https://cdn.pixabay.com/photo/2017/08/06/18/33/barn-2594975__340.jpg"},
//     {name:"Gilgit", image:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__340.jpg"},
//     {name:"Norhten",image:"https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092__340.jpg"},
//     {name:"Pahar ganjh", image:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872__340.jpg"},
//     {name:"Sakhar", image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
//     {name:"Cholistan", image:"https://cdn.pixabay.com/photo/2017/08/06/18/33/barn-2594975__340.jpg"}  
// ]

function seedDB(){
    // remove all camps
    Campground.remove({},function(err){
        if(err){
            console.log(err)
        }else{
            console.log("remove campgrounds")
            // adding new camps
            data.forEach(function(data){
                Campground.create(data,function(err,campground){
                    if(err){
                        console.log(err)
                    }else{
                        console.log("added camp")
                        // create a comment
                        Comment.create(
                            {
                                text:"this is a first comment",
                                author:'tom'
                            },function(err,comment){
                                if(err){
                                    console.log(err)
                                }else{
                                    campground.comment.push(comment);
                                    campground.save();
                                    console.log("Created a new comment")
                                }
                            }
                        )
                    }
                });
            });
        }
    });
}
module.exports  = seedDB;