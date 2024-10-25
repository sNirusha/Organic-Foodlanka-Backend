const router = require('express').Router();
const { Router } = require('express');
let item = require("../models/item.js");
const multer = require('multer');

// Router for CRUD

const upload = multer();
// ADD
// router.route("/add").post((req, res) =>{
//     //Get data
//     // const image = req.body.image;
//     const product_name = req.body.product_name;
//     const product_description = req.body.product_description;
//     const product_price = req.body.product_price;
//     console.log(req.body);
router.route("/add").post(upload.none(), (req, res) => {
    const product_name = req.body.product_name;
    const product_description = req.body.product_description;
    const product_price = req.body.product_price;
    console.log();


// ADD data model
const newItem = new item({
    // image: image,
    product_name: product_name,
    product_description: product_description,
    product_price: product_price
});

      //Save to database
  newItem.save().then(()=>{
    res.json(" Item Added Sucssesfully");
    console.log("Item Added Sucssesfully");
}).catch((err)=>{
    console.log(`Error: ${err}`);
}) 
});

 
// viwe   
router.route("/").get((req, res)=>{

    //Get all item data from database
    item.find().then((data)=>{

        //Send data as json
        res.json(data);

    }).catch((err)=>{
        console.log(`Error: ${err}`);
    })
});

//Delete
router.route("/delete/:id").delete(async (req, res) => {

    //Get ID
    let id = req.params.id;

    await item.findByIdAndDelete(id).then(() => {
        res.status(200).send({status: "item deleted"});
    }).catch(err => {
        console.log(`Error: ${err}`);
        res.status(500).send({status: "Delete error"});
    });

});
    
//    update item
router.route("/update/:id").put(async (req, res) => {


    console.log("Request to update");
    // get item id
    let id = req.params.id;

    // get data
    const { product_name, product_description, product_price } = req.body;

    const updateitem = {
        product_name,
        product_description,
        product_price
    }

      await item.findByIdAndUpdate(id, updateitem).then((data) => {

        // Send updated data as json
        res.status(200).send({status:"item Updated",item:data})
        }).catch((error) => {
            console.log(`Error: ${error}`);
            res.status(500).send({status: "Update error"});
        });


});



module.exports = router;