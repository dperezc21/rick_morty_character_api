import {sequelize} from "../database/connection";
import {DataTypes} from "sequelize";

export const PlaceModel = sequelize.define("Place", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    dimension: DataTypes.STRING,
    origen: DataTypes.BOOLEAN,
    location: DataTypes.BOOLEAN
}, { tableName: "place"});