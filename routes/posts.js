const express = require('express');
const Post = require('../models/Post');
const router = express.Router();


//GETS BACK ALL THE POSTS
router.get('/', async (req, res) => {
    //res.send('I am in posts');
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

// SUBMITS A POST
router.post('/', async (req, res) => {
    //console.log(req.body);
    const post = new Post({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password

    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }

});

//SPECIFIC POST
router.get('/:postId', async (req, res) => {
    //console.log(req.params.postId);
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE A SPECIFIC POST

router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

//UPDATE A SPECIFIC POST
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, { $set: { name: req.body.name } });
        res.json(updatedPost);
    }
    catch (err) {
        res.json({ meassage: err });
    }
})


module.exports = router;