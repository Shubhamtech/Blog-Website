

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
 mongoose.connect("mongodb://127.0.0.1:27017/blogDB",{useNewUrlParser:true});
const homeStartingContent = "The best programs are written so that computing machines can perform them quickly and so that human beings can understand them clearly. A programmer is ideally an essayist who works with traditional aesthetic and literary forms as well as mathematical concepts, to communicate the way that an algorithm works and to convince a reader that the results will be correct.― Donald E. Knuth, Selected Papers on Computer Science"

const aboutContent = "This is a blog website anyone can share their thoughts and thinking this platform is open for all.its very amazing to share interact with each other its a good interactive platform to share thoughts or show some creativity";
const contactContent = "for any query feel free to contact at email kumarshubhamsk999@gmail.com we are listening to all related queries ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const postSchema={
  title:String,
  content:String
};
const Post=mongoose.model("Post",postSchema);

//let posts=[];
app.get("/",function(req,res){
// res.render("home",{StartingContent:homeStartingContent,posts:posts});
 //console.log(posts);
 Post.find({},function(err,posts){
  res.render("home",{StartingContent:homeStartingContent,posts:posts})
});
});

app.get("/about",function(req,res){
 res.render("about",{AboutContentt:aboutContent})
});

app.get("/contact",function(req,res){
  res.render("contact",{ContactContentt:contactContent})
});
  
app.get("/compose",function(req,res){
 res.render("compose");
});

app.post("/compose",function(req,res){
 //console.log(req.body.postTitle);
 /*const post={
   title:req.body.postTitle,
   content:req.body.postBody
 };
 posts.push(post);*/
 post=new Post({
  title:req.body.postTitle,
  content:req.body.postBody
 });
post.save(function(err){
  if(!err){
    res.redirect("/");
  }
});

});
/*Post.find({},function(err,posts){
  res.render("home",{StartingContent:homeStartingContent,posts:posts})
});*/
app.get("/posts/:postid",function(req,res){ ////express rouning parameter
//console.log(req.params.postName);
const requestedTitle= _.lowerCase(req.params.postid);
Post.find({},function(err,posts){
  //res.render("home",{StartingContent:homeStartingContent,posts:posts})
  posts.forEach(function(post){
    // let storedTitles= _.lowerCase(post.title);
     let storedTitles= _.lowerCase(post._id);
   
     if(requestedTitle===storedTitles){
       //console.log("matched");
       res.render("post",{title:post.title,content:post.content})
     }
   })
});

});       








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
