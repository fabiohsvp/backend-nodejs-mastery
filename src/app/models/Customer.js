import Sequelize, { Model, Op } from "sequelize";

class Customer extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                status: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
            },
            {
                scopes: {},
                hooks: {
                    beforeValidate: (customer, options) => {
                        customer.status = "ARCHIVED";
                    },
                },
                sequelize,
            }
        );
    }
    static associate(models) {
        this.hasMany(models.Contact);
    }
}

export default Customer;
