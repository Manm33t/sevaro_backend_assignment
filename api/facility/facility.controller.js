const {
  facilityUser,
  facilityUserMapping,
  facility,
  shiftData,
  facilityConfig,
  schedules,
} = require("../database/init-model");
const { Op } = require("sequelize");
const dayjs = require("dayjs");

const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

exports.addSchedule = async (req) => {
  const {
    userID,
    facilities = [],
    startTime,
    endTime,
    shiftID,
  } = req?.body || {};
  // Convert UTC time to EST
  const startTimeEst = dayjs(startTime, "DD/MM/YYYY HH:mm").tz("EST").format();
  const endTimeEst = dayjs(endTime, "DD/MM/YYYY HH:mm").tz("EST").format();
  const shifts = await shiftData.findOne({
    where: {
      id: shiftID,
    },
  });
  if (!shifts) return { error: `shift  not found.` };

  const userObj = await facilityUser.findOne({
    where: {
      id: userID,
    },
    include: [
      {
        model: facilityUserMapping,
      },
    ],
  });

  if (!userObj || userObj.role !== "doctor") {
    return { error: "Role is not doctor" };
  }

  // Ensure shift time validity
  if (
    dayjs(startTimeEst).isBefore(shifts.startTime) ||
    dayjs(endTimeEst).isAfter(shifts.endTime)
  ) {
    return { error: `Invalid time range for shift '${shifts.name}'.` };
  }
  const validFacilities = await facility.findAll({
    where: {
      facilityID: userObj.facility_users_mappings.map((a) => a.facilityID),
    },
    include: [
      {
        model: facilityConfig,
      },
    ],
  });

  const validFacilitiesForUser = validFacilities.filter((f) => {
    const contracts = f?.contract?.split(",") || [];
    const shiftsContract = shifts.contract?.split(",") || [];
    return (
      facilities.includes(f.facilityName) &&
      contracts.some((contract) => shiftsContract.includes(contract))
    );
  });

  if (validFacilitiesForUser.length === 0) {
    return {
      error: `No valid facilities for user '${userObj.firstName} ${userObj.lastName}' and shift '${shifts.name}'.`,
    };
  }

  const reachedLimitFacilities = [];

  const existingSchedules = await schedules.findAll({
    where: {
      userID,
      shiftID,
    },
    include: [
      {
        model: facility,
      },
    ],
  });

  for (const facility of validFacilitiesForUser) {
    const currentSchedules = existingSchedules.filter((s) => {
      return (
        s.facilityName === facility.name &&
        dayjs(s.startTime).isSame(startTimeEst, "day")
      );
    });

    if (currentSchedules.length >= facility?.facility_config?.maxSchedules) {
      reachedLimitFacilities.push(facility.name);
    }
  }

  if (reachedLimitFacilities.length > 0) {
    return {
      error: `Max schedules reached for facilities: ${reachedLimitFacilities.join(
        ", "
      )}. Please remove some.`,
    };
  }

  // // Add schedules for valid facilities
  const newSchedules = validFacilitiesForUser.map((facility) => ({
    userID,
    facilityID: facility.facilityID,
    shiftID,
    contract: facility.contract,
    startTime: startTimeEst,
    endTime: endTimeEst,
  }));

  // schedules.push(...newSchedules);

  await schedules.bulkCreate(newSchedules);

  return { success: true, schedules: newSchedules };
};

exports.fetchUsers = async (req) => {
  return facilityUser.findAll({});
};

exports.fetchFacility = async (req) => {
  return facility.findAll({});
};

exports.fetchShifts = async (req) => {
  return shiftData.findAll({});
};
