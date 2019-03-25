const {Router} = require('express');

const postsRouter = new Router();

let Post = require("../../models/Post");

postsRouter.get("/" ,(req,res) => {
    Post.find(function(err,posts) {
        if(err){
            console.log(err)
        }
        else {
            res.json(posts)
        }
    });
});

module.exports = postsRouter;