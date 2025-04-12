import {DataTypes} from "sequelize";
import db from "../database/db-connection";

export const CharacterModel = db.getConnection().define("Character", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    species: DataTypes.STRING,
    type: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    created: DataTypes.DATE
}, { tableName: "character"});

