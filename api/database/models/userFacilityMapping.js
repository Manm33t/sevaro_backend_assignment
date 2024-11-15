const { literal } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define("facility_users_mapping", {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    facilityID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "facility_id",
    },
    userID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "user_id",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: literal("CURRENT_TIMESTAMP"),
      field: "updated_at",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "created_at",
    },
  });
};
