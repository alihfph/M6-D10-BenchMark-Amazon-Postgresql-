const { Sequelize, DataTypes } = require("sequelize");
const User = require('./users')
const Category = require('./categories')
const Product = require('./products')
const Cart = require('./carts')
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    dialectOptions:{
      ssl:{
        require:true, 
        rejectUnauthorized:false
      }
    }
  }
);

const models = {
  User:User(sequelize, DataTypes),
  Category:Category(sequelize, DataTypes),
  Product:Product(sequelize, DataTypes),
  Cart:Cart(sequelize, DataTypes),
  sequelize:sequelize

}

// models.Product.belongsTo(models.Category)
// models.Category.hasMany(models.Product)



// models.Product.belongsToMany(models.User, {through:models.Cart})
// models.User.belongsToMany(models.Product, {through:models.Cart})

// models.Cart.belongsTo(models.User)
// models.User.hasMany(models.Cart)

// models.Cart.belongsTo(models.Product)
// models.Product.hasMany(models.Cart)

Object.keys(models).forEach(modelName=> {
 
  if('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})
sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log("Connection failed ", e));

module.exports = models;
