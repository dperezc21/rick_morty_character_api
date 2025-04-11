import {sequelize} from "../database/connection";
import {DataTypes} from "sequelize";

export const CharacterModel = sequelize.define("Character", {
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

