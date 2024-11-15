var DataTypes = require("sequelize").DataTypes;
DataTypes.Ti;
var _user = require("../database/models/users");
var _facility_users_mapping = require("../database/models/userFacilityMapping");
var _facility = require("../database/models/facilities");
var _shift_data = require("./models/shiftData");
var _schedules = require("./models/schedule");
var _facility_config = require("./models/facility_config");
const sequelize = require("./sequelize");

//

function initModels(sequelize) {
  // fs
  var facilityUser = _user(sequelize, DataTypes);
  var facilityUserMapping = _facility_users_mapping(sequelize, DataTypes);
  var facility = _facility(sequelize, DataTypes);
  var shiftData = _shift_data(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var facilityConfig = _facility_config(sequelize, DataTypes);

  facilityUser.hasMany(facilityUserMapping, { foreignKey: "userID" });
  facility.hasOne(facilityConfig, { foreignKey: "facilityID" });
  schedules.belongsTo(facility, { foreignKey: "facilityID" });

  return {
    facilityUser,
    facilityUserMapping,
    facility,
    shiftData,
    schedules,
    facilityConfig,
  };
}

const models = initModels(sequelize);

module.exports = models;
module.exports.models = models;
module.exports.default = models;
