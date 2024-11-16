const { literal } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define("shift_data", {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "name",
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "start_time",
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "end_time",
    },
    contract: {
      type: DataTypes.STRING(300),
      allowNull: false,
      field: "contract",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: literal("CURRENT_TIMESTAMP"),
      field: "updated_at",
    },
    isDaySpillShift: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "is_day_spill_shift",
    },
    isNightShift: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "is_night_shift",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "created_at",
    },
  });
};
