import {sequelize} from "../database/connection";
import {DataTypes} from "sequelize";
import {EpisodeModel} from "./episode.model";
import {CharacterModel} from "./character.model";

export const EpisodeCharacterModel = sequelize.define("EpisodeCharacter", {
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
