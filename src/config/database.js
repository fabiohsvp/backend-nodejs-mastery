import dotenv from "dotenv";
import process from "process";
dotenv.config();

// eslint-disable-next-line no-undef
export default {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    define: {
        timestamps: true, // cria duas colunas: createdAt updatedAt
        underscored: true, // nomenclatura _ (não camelCase) customersGroup => customers_group
        underscoredAll: true,
    },
};
