import {sequelize} from "../database/connection";
import {DataTypes} from "sequelize";
import {PlaceModel} from "./place.model";
import {CharacterModel} from "./character.model";

export const PlaceCharacterModel = sequelize.define("PlaceCharacter", {
    place_id: {
        type: DataTypes.INTEGER,
        references: {
            model: PlaceModel,
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
}, { tableName: "place_character"});