var bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose"),
    express         = require("express"),
    app             = express();
//APP CONFIG    
mongoose.connect("mongodb://localhost/restBlog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES
app.get("/", function(req, res) {
   res.redirect("/blogs"); 
});
//INDEX
app.get("/blogs", function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs:blogs})
        }
    });
});
//NEW
app.get("/blogs/new", function(req, res) {
    res.render("new");
});
//CREATE
app.post("/blogs", function(req,res){
    Blog.create(req.body.blog,function(err,blogs){
        if(err){
            console.log(err);
            res.render("new");
        }else{
            res.redirect("/blogs")
        }
    });
});
//SHOW
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog:blog})
        }
    });
});
//EDIT
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog:blog})
        }
    });
});
//UPDATE
app.put("/blogs/:id", function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,blog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});
//DESTROY

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog Server Running");
});