require("dotenv").config();

const { DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DATABASE_USERNAME || "postgres",
    password: DATABASE_PASSWORD || "postgres",
    database: "database_auth_server_development",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: DATABASE_USERNAME || "postgres",
    password: DATABASE_PASSWORD || "postgres",
    database: "database_auth_server_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: DATABASE_USERNAME || "postgres",
    password: DATABASE_PASSWORD || "postgres",
    database: "database_auth_server_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
