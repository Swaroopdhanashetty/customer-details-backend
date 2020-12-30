const express = require('express')
const router = express.Router()
const Cust = require('./models/customer')
const AuthController = require('./authController')
const authentication = require('./authenticate')


router.post("/", async(req,res) =>{
    try{
        const cust=new Cust(req.body);
        const createCust = await cust.save()
        res.status(201).send(createCust)
    }catch (err) {res.status(201).send(err)}
})

router.get("/",  async(req,res)=>{
    try{
        const name = req.query.name;
        var condition = name ? {name : { $regex : new RegExp(name), $options :"i" }} : {};
        const custData = await Cust.find(condition);
        res.send(custData)
     
    } catch(err) {
        res.send(err)
    } 
})
router.get("/:id", async (req,res)=>{
    try {
        const _id = req.params.id;
        const customerData = await Cust.findById(_id);
            console.log(customerData);
        if(!customerData){
            return res.status(404).send();
        }else{
            res.send(customerData);
        }
        
    } catch (e) {
        res.status(500).send(e);
    }
})



router.delete("/:id", async(req,res) => {
    try{
        const deleteCunstomr = await Cust.findByIdAndDelete(req.params.id);
        if(!deleteCunstomr){
            return res.status(400).send();
        }
        else
        {
            res.send(deleteCunstomr);
        }
    }catch(err){
        res.status(500).send(err);
    }
})

router.patch("/:id", async(req,res) =>{
    try{
        const _id = req.params.id;
        const updateCust = await Cust.findByIdAndUpdate(_id,req.body);
        res.send(updateCust);
    }catch(err){
        res.status(404).send(err);
    }

})

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)


module.exports = router