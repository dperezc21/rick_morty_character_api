

import {sequelize} from "../database/connection";
import {DataTypes} from "sequelize";

export const EpisodeModel = sequelize.define("Episode", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true
    }
}, { tableName: "episode"});