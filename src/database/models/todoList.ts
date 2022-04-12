import sequelize from "../connection";
import { DataTypes, Model } from "sequelize";

class TodoList extends Model {}

TodoList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fields: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        defaultValue: []
    }
}, { sequelize, modelName: "TodoList", timestamps: true, tableName: "todolist" });

TodoList.sync({ alter: true });

export default TodoList;
