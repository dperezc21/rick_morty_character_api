import {sequelize} from "../database/connection";
import {DataTypes} from "sequelize";
import {Episode} from "./episode.model";
import {Character} from "./character.model";

export const EpisodeCharacter = sequelize.define("EpisodeCharacter", {
    episode_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Episode,
            key: "id"
        }
    },
    character_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Character,
            key: "id"
        }
    }
}, { tableName: "episode_character"});
