module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "reviews",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      comment: {
        type: DataTypes.STRING,
        required: true,
      },
      rate: {
        type: DataTypes.FLOAT,
        required: true,
      },
    },
    { timestamps: true }
  );
  Review.associate = (models) => {
    Review.belongsTo(models.Product);
  };
  return Review;
};
