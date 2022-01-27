import sequelize from "../connection";
import { DataTypes, Model } from "sequelize/dist";

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: "User", timestamps: true });

User.sync({ alter: true });

export default User;
