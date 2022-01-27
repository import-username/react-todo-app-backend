import { Sequelize } from "sequelize/dist";

if (!process.env.DB_URI) {
    console.log("Must include property DB_URI with postgres database uri.");
}

const sequelize: Sequelize = new Sequelize(<string> process.env.DB_URI, {
    logging: false
});

try {
    sequelize.authenticate();
} catch (error) {
    console.error("Failed to connect to database.", error);
}

export default sequelize;
