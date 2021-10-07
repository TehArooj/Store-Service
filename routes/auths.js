const express = require('express');
const Auth = require('../models/Auth');
const router = express.Router();


//GETS BACK ALL THE AuthS
router.get('/', async (req, res) => {
    //res.send('I am in Auths');
    try {
        const auths = await Auth.find();
        res.json(auths);
    } catch (err) {
        res.json({ message: err });
    }
});

// SUBMITS A Auth
router.post('/', async (req, res) => {
    //console.log(req.body);
    const auth = new Auth({
        username: req.body.username,
        lastPasswordEdit: req.body.lastPasswordEdit,
        storeId: req.body.storeId,
        password: req.body.password

    });

    try {
        const savedAuth = await auth.save();
        res.json(savedAuth);
    } catch (err) {
        res.json({ message: err });
    }

});

//SPECIFIC Auth
router.post('/get_auth', async (req, res) => {
    //console.log(req.params.authId);
    try {
        const auth = await Auth.findById(req.body._id);
        res.json(auth);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE A SPECIFIC Auth

router.delete('/get_auth', async (req, res) => {
    try {
        const removedAuth = await Auth.deleteOne({ _id: req.body._id });
        res.json(removedAuth);
    } catch (err) {
        res.json({ message: err });
    }
});

//UPDATE A SPECIFIC Auth
router.patch('/get_auth', async (req, res) => {
    try {
        const updatedAuth = await Auth.updateOne({ _id: req.body._id }, { $set: { username: req.body.username } });
        res.json(updatedAuth);
    }
    catch (err) {
        res.json({ meassage: err });
    }
})


module.exports = router;