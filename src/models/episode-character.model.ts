import {DataTypes} from "sequelize";
import {EpisodeModel} from "./episode.model";
import {CharacterModel} from "./character.model";
import db from "../database/db-connection";

export const EpisodeCharacterModel = db.getConnection().define("EpisodeCharacter", {
    episode_id: {
        type: DataTypes.INTEGER,
        references: {
            model: EpisodeModel,
            key: "id"
        }
    },
    character_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CharacterModel,
            key: "id"
        }
    }
}, { tableName: "episode_character"});
