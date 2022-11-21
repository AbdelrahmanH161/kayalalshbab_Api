const express = require("express");
const router = express.Router();
const multer = require("multer");
const Item = require("../Models/Item");
const Category =require("../Models/Category");
/////////////////Cateory Routes/////////////////////
router.post("/createCategory",async(req,res)=>{
    try{
        await Category.create(req.body,function(err,data){
            if (err) {
                res.send({massege: "Add failed", success: false , Data:err});
            } else {
                res.send({massege: "Added successfully", success: true , Data:data});
            }
        });
    }catch(err){
        res.send(err);
    }
});

router.get("/getCategory",async(req,res)=>{
    try{
        await Category.find({}).then((data,err)=>{
            if(err){
                res.send({massege: "get data failed", success: false , Data:err});
            }else{
                res.send({massege: "get data successfully", success: true , Data:data});
            }
        })
    }catch(err){
        res.send(err);
    }
});
//////////////////Item Rouets//////////////////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});
const multi_upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    }
});

router.post('/createItem',multi_upload.single("image"),async (req,res)=>{
    try{
        let image= req.file.path;
        req.body.image = image;
        await Item.create(req.body,function(err,data){
            if (err) {
                res.send({massege: "Add failed", success: false , Data:err});
            } else {
                res.send({massege: "Added successfully", success: true , Data:data});
            }
        });
    }catch(err){
        res.send(err);
    }
});

router.get("/getItem/:catId",async(req,res)=>{
    try{
        await Item.find({categoryId:req.params.catId}).then((data,err)=>{
            if(err){
                res.send({massege: "get data failed", success: false , Data:err});
            }else{
                res.send({massege: "get data successfully", success: true , Data:data});
            }
        })
    }catch(err){
        res.send(err);
    }
});
///////////////////////////////////////////////////
module.exports = router;