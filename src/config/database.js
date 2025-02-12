// eslint-disable-next-line no-undef
module.exports = {
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "secret",
    database: "postgres",
    define: {
        timestamps: true, // cria duas colunas: createdAt updatedAt
        underscored: true, // nomenclatura _ (não camelCase) customersGroup => customers_group
        underscoredAll: true,
    },
};
