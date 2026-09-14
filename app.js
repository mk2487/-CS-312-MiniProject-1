const express = require("express");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;
let posts = [];

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Home page
app.get("/", (req, res) => {
    res.render("index", { posts: posts });
});

// Create a new post
app.post("/posts", (req, res) => {
    const newPost = {
        id: Date.now(),
        creator: req.body.creator,
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        date: new Date().toLocaleString()
    };

    posts.push(newPost);

    res.redirect("/");
});

app.get("/posts/:id/edit", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.send("Post not found");
    }

    res.render("edit", { post: post });
});

app.put("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.send("Post not found");
    }

    post.creator = req.body.creator;
    post.title = req.body.title;
    post.content = req.body.content;
    post.category = req.body.category;

    res.redirect("/");
});

app.delete("/posts/:id", (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);

    res.redirect("/");
});

app.listen(PORT, () => {
    console.log("Server is running at http://localhost:" + PORT);
});