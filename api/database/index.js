const { Model } = require("sequelize");
const sequelize = require("./sequelize");

class AppModel extends Model {
  static init(columns, sequelizeConfig, pk, config = {}) {
    super.init(columns, {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      ...sequelizeConfig,
    });
    this.pk = pk;
    this.config = config;
    // this.sync().catch((error) => {
    //   console.log(error);
    // });
  }

  static config = {};

  /**
   * To select only specific attributes from the model
   * @param {*} attributes array of attibutes to select
   * @returns instance of model
   */
  static select(attributes) {
    attributes.pushOnce(this.pk);
    this.config.attributes = attributes;
    return this;
  }

  static exclude(attributes) {
    this.config.attributes = { ...this.config.attributes, exclude: attributes };
    return this;
  }

  /**
   * Limit the number of entries to be retrieved
   * @param {number} l limit
   * @returns instance of model
   */
  static limit(l) {
    this.config.limit = l;
    return this;
  }

  /**
   * Group by specific attributes
   * @param {*} attributes array of attibutes to group by
   * @returns instance of model
   */
  static groupBy(attributes) {
    this.config.group = attributes;
    return this;
  }

  /**
   * Order by attributes
   * @param {*} attributes array of attibutes to order by
   * @returns instance of model
   */
  static orderBy(attributes) {
    this.config.order = attributes;
    return this;
  }

  /**
   * Find entry in the model by value of primary key
   * @param {number|string} id value of primary key
   * @returns user instance of the found id
   */
  static find(id) {
    const params = {
      where: {
        [this.pk]: id,
      },
    };
    return this.findOne(this.processParams(params));
  }

  /**
   * Search in the model based on specific field
   * It will always have a single entry
   * @param {*} where object to apply where clause
   * @returns user instance of the found entry
   */
  static findBy(where) {
    const params = {
      where,
    };
    return this.findOne(this.processParams(params));
  }

  /**
   * Search in the model based on specific field
   * It can have multiple entries. Datavalues will
   * contain array of found elements
   * @param {*} where object to apply where clause
   * @returns user instance of the found entries
   */
  static where(searchParams) {
    let params = {};
    if (searchParams) {
      params = {
        where: searchParams,
      };
    }
    return this.findAll(this.processParams(params));
  }

  /**
   * Delete entries based on some params
   * @param {*} where object to apply where clause
   * @returns user instance of the deleted entries
   */
  static delete(where) {
    const params = {
      where,
    };
    return this.destroy(params);
  }

  /**
   * Search in the model based on specific field
   * and returns the count
   * @param {*} where object to apply where clause
   * @returns {number} count of found entries
   */
  static size(where) {
    const params = {
      where,
    };
    return this.count(this.processParams(params));
  }

  /**
   * Checks whether any such entries exist
   * @param {*} where object to apply where clause
   * @returns {Promise<boolean>} whether an entry exist
   */
  static async exists(where) {
    // cannot user async/await in static methods, hence used Promise
    return new Promise((resolve) =>
      this.size(where).then((size) => resolve(!!size))
    );
  }

  /**
   *
   * @param {boolean} paranoid whether process for paranoid entries
   */
  static paranoid(isParanoid) {
    {
      this.config.paranoid = isParanoid;
      return this;
    }
  }

  /**
   * Update the object and allow individual hooks
   * @param {*} obj object to update
   * @param {*} pk primary key value
   * @returns updated object
   */
  static async updateByPk(obj, pk) {
    await super.update(obj, {
      where: { [this.pk]: pk },
      individualHooks: true,
    });
    return this.find(pk);
  }

  static associate() {}

  /**
   * Process all the params to create an object for operations
   * @param {*} params object to apply where clause
   * @returns user instance of the found entries
   */
  static processParams(params) {
    if (this.config.attributes) {
      params.attributes = this.config.attributes;
    }
    if (this.config.limit) {
      params.limit = this.config.limit;
    }
    if (this.config.group) {
      params.group = this.config.group;
    }
    if (this.config.order) {
      params.order = this.config.order;
    }
    if (this.config.hasOwnProperty("paranoid")) {
      params.paranoid = this.config.paranoid;
    }
    this.config = {};
    return params;
  }
}

module.exports = AppModel;
