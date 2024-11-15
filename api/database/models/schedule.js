const { literal } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define("schedules", {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    userID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "user_id",
    },
    shiftID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "shift_id",
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "start_date",
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "end_date",
    },
    contract: {
      type: DataTypes.STRING(300),
      allowNull: false,
      field: "contract",
    },

    facilityID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "facility_id",
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
