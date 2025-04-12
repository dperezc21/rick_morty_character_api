import {DataTypes} from "sequelize";
import db from "../database/db-connection";

export const EpisodeModel = db.getConnection().define("Episode", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true
    }
}, { tableName: "episode"});