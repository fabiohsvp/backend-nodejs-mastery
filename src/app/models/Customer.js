import Sequelize, { Model } from "sequelize";

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
                    beforeValidate: (customer) => {
                        customer.status = "ARCHIVED";
                    },
                },
                sequelize,
                name: {
                    singular: "customer",
                    plural: "customers",
                },
            }
        );
    }
    static associate(models) {
        this.hasMany(models.Contact);
    }
}

export default Customer;
