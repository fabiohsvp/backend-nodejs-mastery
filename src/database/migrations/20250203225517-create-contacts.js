// eslint-disable-next-line no-undef
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("contacts", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            created_at: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            customer_id: {
                type: Sequelize.INTEGER,
                references: { model: "customers", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable("contacts");
    },
};
