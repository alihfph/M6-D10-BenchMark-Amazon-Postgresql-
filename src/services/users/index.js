const express = require("express");
const User = require("../../db").User;
const Product = require("../../db").Product;
const Cart = require("../../db").Cart;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll({ include: Cart, include: Product });
      res.send(users);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.send(user);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: Cart,
        include: Product,
      });
      res.send(user);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const user = await User.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.send(user);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const user = await User.destroy({ where: { id: req.params.id } });
      if (user > 0) {
        res.send("ok");
      } else {
        res.status(404).send("Not found");
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
