const express = require("express");
const Product = require("../../db").Product;
const Review = require("../../db").Review;
const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: Product });
    res.send(reviews);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.route("/:productId").post(async (req, res, next) => {
  try {
    const reviews = await Review.create({
      ...req.body,
      productId: req.params.productId,
    });
    res.send(reviews);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    const review = await Review.findByPk(req.params.id, {
      include: Product,
    });
    res.send(review);
    try {
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    const review = await Review.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(review);
    try {
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const review = await Review.destroy({ where: { id: req.params.id } });
      if (review > 0) {
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
