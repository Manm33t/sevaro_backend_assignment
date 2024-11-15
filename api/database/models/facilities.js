const { literal } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define("facility", {
    facilityID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: "facility_id",
    },
    facilityName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "facility_name",
    },
    logo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "logo",
    },
    shortName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "short_name",
    },
    timezone: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "time_zone",
    },
    contract: {
      type: DataTypes.ENUM("emergent", "non-emergent"),
      allowNull: false,
      field: "contract",
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
