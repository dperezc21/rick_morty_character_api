import {DataTypes} from "sequelize";
import db from "../database/db-connection";

export const PlaceModel = db.getConnection().define("Place", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    dimension: DataTypes.STRING,
    origen: DataTypes.BOOLEAN,
    location: DataTypes.BOOLEAN,
    created: DataTypes.DATE
}, { tableName: "place"});