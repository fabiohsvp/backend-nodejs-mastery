// eslint-disable-next-line no-undef
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn("customers", "status", {
            type: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
            allowNull: false,
            defaultValue: "ACTIVE",
        });
    },

    async down(queryInterface) {
        return queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn("customers", "status", {
                transaction,
            });
            await queryInterface.sequelize.query(
                "DROP TYPE enum_customers_status",
                {
                    transaction,
                }
            );
        });
    },
};
