const router = require('express').Router();
const { Router } = require('express');
let student = require("../models/student.js");


/**
 * 
 * Routes for CRUD
 * 
**/

//ADD
router.route("/add").post((req, res)=>{

    //Get data
    const name = req.body.name;

    //const gender = req.body.gender;
   // const address = req.body.address;
    const email = req.body.email;
    const password = req.body.password;

    //Add data to model
    const newStudent = new student({
        name,
     
       // gender,
       // address
       email,
       password
    });

    //Save to database
    newStudent.save().then(()=>{
        res.json("User Added Sucssesfully");
    }).catch((err)=>{
        console.log(`Error: ${err}`);
    }) 

});


//View
router.route("/").get((req, res)=>{

    //Get all student data from databse
    student.find().then((data)=>{

        //Send data as json
        res.json(data);

    }).catch((err)=>{
        console.log(`Error: ${err}`);
    })
});



/*

//View
router.route("/get/:id").get((req, res)=>{

    console.log(id);

    //Get all student data from databse
    student.findById().then((data)=>{

        //Send data as json
        res.json(data);

    }).catch((err)=>{
        console.log(`Error: ${err}`);
    })
});

*/


//Update
router.route("/update/:id").put(async (req, res)=>{

    //Get student ID
    let id = req.params.id;

    /**
     * 
     * Destructure
     * 
    **/

    //Get data
   // const { name, gender, address } = req.body;
   const { name, email, password } = req.body;


    //Update
    // const updateStudent = {
    //     name,
   
    //     gender,
    //     address
    // }

    const updateStudent = {
        name,
        email,
        password
        
    }

    await student.findByIdAndUpdate(id, updateStudent).then((data) => {
        //Response
        res.status(200).send({status: "User Updated", user: data})
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({status: "Update error"});
    });


});

//Delete
router.route("/delete/:id").delete(async (req, res) => {

    //Get ID
    let id = req.params.id;

    await student.findByIdAndDelete(id).then(() => {
        res.status(200).send({status: "User deleted"});
    }).catch(err => {
        console.log(`Error: ${err}`);
        res.status(500).send({status: "Delete error"});
    });

});



//Get only one student data
router.route("/get/:id").get(async (req, res) => {

    //Get ID
    let id = req.params.id;

    //Get data from database
    await student.findById(id).then((data) =>{
        res.status(200).send({user:data})
    }).catch((err) =>{
        console.log(`Error: ${err}`);
        res.status(500).send({status: "Error getting data"});
    });

});


module.exports = router;