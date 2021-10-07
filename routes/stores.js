const express = require('express');
const Store = require('../models/Store');
const router = express.Router();

var count=0;


//GETS BACK ALL THE StoreS
router.get('/', async (req, res) => {
    //res.send('I am in Stores');
    try {
        const stores = await Store.find();
        count= await Store.count();
        console.log(`Store count is : ${count}`);
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

router.post('/get_store', async (req, res) => {
    try {
        const store = await Store.findById(req.body._id);
        //console.log(req.body);
        res.json(store);
    } catch (err) {
        res.json({ message: err });
    }
});


//DELETE A SPECIFIC Store

router.delete('/get_store', async (req, res) => {
    try {
        //const removedStore = await Store.remove({ _id: req.params.storeId });
        const removedStore = await Store.deleteOne({ _id: req.body._id });
        count= await Store.count();
        console.log(`Store count : ${count}`);
        res.json(removedStore);
    } catch (err) {
        res.json({ message: err });
    }
});



//UPDATE A SPECIFIC Store
router.patch('/get_store', async (req, res) => {
    try {
        const updatedStore = await Store.updateOne({ _id: req.body._id }, { $set: { memberSince: req.body.memberSince } });
        res.json(updatedStore);
    }
    catch (err) {
        res.json({ meassage: err });
    }
});
 

//UPDATE MANY 
/*
router.patch('/:storeId', async (req, res) => {
    try {
        const updatedStore = await Store.updateMany//({ _id: req.params.storeId }, { $set: { memberSince: req.body.memberSince } });
        res.json(updatedStore);
    }
    catch (err) {
        res.json({ meassage: err });
    }
});
*/


module.exports = router;