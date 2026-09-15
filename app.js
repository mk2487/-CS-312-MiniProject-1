const express = require("express");
const methodOverride = require("method-override");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const app = express();
const PORT = process.env.PORT || 3000;
let posts = [];
const categories = ["Tech", "Lifestyle", "Education", "Other"];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    const category = categories.includes(req.query.category) ? req.query.category : "";
    res.render("index", { posts: category ? posts.filter(p => p.category === category) : posts, category, categories });
});

app.get("/health", (req, res) => res.sendStatus(200));

function validatePost(req, res, next) {
    for (const [field, limit] of [["creator", 100], ["title", 200], ["content", 20000]]) {
        if (typeof req.body[field] !== "string" || !req.body[field].trim() || req.body[field].length > limit) {
            return res.status(400).send("Please provide a valid name, title, and blog content. Use your browser's Back button to correct the form.");
        }
        req.body[field] = req.body[field].trim();
    }
    if (!categories.includes(req.body.category)) return res.status(400).send("Please select a valid category.");
    next();
}

app.post("/posts", validatePost, (req, res) => {
    const newPost = {
        id: randomUUID(),
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
        return res.status(404).send("Post not found");
    }

    res.render("edit", { post: post });
});

app.put("/posts/:id", validatePost, (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.status(404).send("Post not found");
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

if (require.main === module) app.listen(PORT, "0.0.0.0", () => {
    console.log("Server is running at http://localhost:" + PORT);
});

module.exports = app;
