const express = require('express');
const Store = require('../models/Store');
const router = express.Router();


//GETS BACK ALL THE StoreS
router.get('/', async (req, res) => {
    //res.send('I am in Stores');
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (err) {
        res.json({ message: err });
    }
});

// SUBMITS A Store
router.post('/', async (req, res) => {
    //console.log(req.body);
    const store = new Store({
        name: req.body.name,
        totalNumberOfProducts: req.body.totalNumberOfProducts,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        location:req.body.location,
        memberSince:req.body.memberSince
    });

    try {
        const savedStore = await store.save();
        res.json(savedStore);
    } catch (err) {
        res.json({ message: err });
    }

});

//SPECIFIC Store
router.get('/:storeId', async (req, res) => {
    //console.log(req.params.storeId);
    try {
        const store = await Store.findById(req.params.storeId);
        res.json(store);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE A SPECIFIC Store

router.delete('/:storeId', async (req, res) => {
    try {
        const removedStore = await Store.remove({ _id: req.params.storeId });
        res.json(removedStore);
    } catch (err) {
        res.json({ message: err });
    }
});

//UPDATE A SPECIFIC Store
router.patch('/:storeId', async (req, res) => {
    try {
        const updatedStore = await Store.updateOne({ _id: req.params.storeId }, { $set: { memberSince: req.body.memberSince } });
        res.json(updatedStore);
    }
    catch (err) {
        res.json({ meassage: err });
    }
})


module.exports = router;