const express = require("express");
const Product = require('../../db').Product
const Category = require('../../db').Category
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
     const products = await Product.findAll({include:Category})
     res.send(products)
    
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const product = await Product.create(req.body)
      res.send(product)
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id)
      res.send(product)
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const product = await Product.update(req.body, {where:{id:req.params.id}, returning:true})
      res.send(product)
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
     const rows = await Product.destroy({where:{id:req.params.id}})
     if(rows>0) {
       res.send('ok')
     } else {
       res.status(404).send('Not found')
     }
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
