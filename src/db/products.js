module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    brand: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      required: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      required: true,
    },

    price: {
      type: DataTypes.FLOAT,
      required: true,
    },
    quantity: {
      type: DataTypes.FLOAT,
      required: true,
    },
    category: {
      type: DataTypes.STRING,
      required: true,
    },
  });
  Product.associate = (models) => {
    Product.hasMany(models.Review);
    Product.belongsToMany(models.User, {
      through: { model: models.Cart, unique: false },
    });
    Product.hasMany(models.Cart);
  };
  return Product;
};
