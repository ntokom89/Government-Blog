const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const checkAuth = require('../check-auth')

router.get('',(req,res) =>{
//https://www.positronx.io/mean-stack-tutorial-angular-crud-bootstrap/
//
Post.find().then((posts) =>{
  res.json({
    message: "Posts found",
    posts:posts
  })
})
})

//https://www.positronx.io/mean-stack-tutorial-angular-crud-bootstrap/
router.post('',checkAuth,(req,res) =>{
    const post = new Post(
      {
        id: req.body.id,
        name: req.body.name, 
        description: req.body.description,
        content: req.body.content
      }
    )
    post.save().then(()=>{
        res.status(201).json({
        message: 'Post created',
        post:post
        })
        })
})

//https://www.positronx.io/mean-stack-tutorial-angular-crud-bootstrap/
router.delete('/:id',checkAuth,(req,res)=>{
  Post.deleteOne({_id: req.params.id})
  .then((result) => {
    res.status(200).json({message: "Post deleted"});
  }).catch((err) => {
    res.status(400).json({message: "Post cannot be identified"});
  })
})

module.exports = router