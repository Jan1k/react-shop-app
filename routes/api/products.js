const {Router} = require('express');

const productsRouter = new Router();

let Products = require("../../models/Products");

productsRouter.get("/" ,(req,res) => {
    Products.find(function(err,products) {
        if(err){
            console.log(err)
        }
        else {
            res.json(products)
        }
    });
});

module.exports = productsRouter;