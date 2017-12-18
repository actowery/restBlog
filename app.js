var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();
//APP CONFIG    
mongoose.connect("mongodb://localhost/restBlog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
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
//UPDATE
//DESTROY

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog Server Running");
});