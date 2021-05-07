const express = require("express");
const Cart = require("../../db").Cart;
const Product = require("../../db").Product;
const User = require("../../db").User;
const Review = require("../../db").Review;
const { Sequelize } = require("../../db").sequelize;
const router = express.Router();

router.route("/:userId").get(async (req, res, next) => {
  try {
    // select  "productId", p.id,  p.name, p.price, "categoryId", count("productId") as unitaryPrice
    // from carts as c
    // inner join products as p
    // on c."productId"=p.id
    // group by "productId", p.id

    const cart = await Cart.findAll(
      {
        attributes: [
          "productId",

          [
            Sequelize.fn("COUNT", Sequelize.col("productId.quantity")),
            "unitaryQty",
          ],
          [
            Sequelize.fn("SUM", Sequelize.col("productId.price")),
            "unitaryPrice",
          ],
        ],
        group: ["productId", "product.id", "user.id", "product->review.id"],
        include: [{ model: Product, include: Review }, User],
      }
      // {
      //   attributes: [
      //     "productId",
      //     [Sequelize.fn("count", Sequelize.col("product.price")), "count"],
      //   ],
      //   group: ["Cart.productId"],
      //   raw: true,
      //   order: Sequelize.literal("count DESC"),
      // }
    );

    const totalQty = await Cart.count({ where: { userId: req.params.userId } });

    // const totalPrice = await Cart.sum("product.price", {
    //   where: { userId: req.params.userId },
    //   include: { model: Product, attributes: [] },
    // });
    res.send({ cart, totalPrice, totalQty });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.route("/").get(async (req, res, next) => {
  try {
    const cart = await Cart.findAll({ include: User });
    res.send(cart);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.route("/:userId/:id").get(async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id, {
      include: User,
      include: Product,
    });
    res.send(cart);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.route("/:userId/:productId").post(async (req, res, next) => {
  try {
    const rawCart = await Cart.create({
      userId: req.params.userId,
      productId: req.params.productId,
    });
    res.send(rawCart);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.route("/:userId/productId/:id").delete(async (req, res, next) => {
  try {
    const cart = await Cart.destroy(req.params.productId);
    console.log("this is I am getting", cart);
    if (cart > 0) {
      res.send("ok");
    } else {
      res.status(404).send("Not found");
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.route("/:userId/:id").delete(async (req, res, next) => {
  try {
    const cart = await Cart.destroy(req.params.id);
    if (cart > 0) {
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
