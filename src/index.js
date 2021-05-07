const express = require("express");

const productsRouter = require("./services/products");
const cartsRouter = require("./services/cart");
const reviewsRouter = require("./services/reviews");
const usersRouter = require("./services/users");
const db = require("./db");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/users", usersRouter);
server.use("/products", productsRouter);
server.use("/carts", cartsRouter);
server.use("/reviews", reviewsRouter);
db.sequelize
  .sync({ force: false })
  .then((result) => {
    return db.User.findByPk(1);
  })
  .then(async (user) => {
    if (!user) {
      const newUser = await db.User.create({
        firstName: "Hafiz",
        lastName: "Ali",
        email: "ali.hfph@gmail.com",
      });
    }
  })
  .then(() => {
    server.listen(process.env.PORT || 2500, () => {
      console.log("server is running on port ", process.env.PORT || 2500);
    });
  });
