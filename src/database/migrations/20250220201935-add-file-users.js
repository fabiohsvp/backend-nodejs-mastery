/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn("users", "file_id", {
          type: Sequelize.INTEGER,
          references: { model: "files", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
      });
  },

  async down(queryInterface) {
      return queryInterface.removeColumn("users", "file_id");
  },
};
