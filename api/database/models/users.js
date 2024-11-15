const { literal } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define("facility_users", {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "email",
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "last_name",
    },
    role: {
      type: DataTypes.ENUM("doctor", "nurse"),
      allowNull: false,
      field: "role",
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
