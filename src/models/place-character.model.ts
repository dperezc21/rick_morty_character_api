import {DataTypes} from "sequelize";
import {PlaceModel} from "./place.model";
import {CharacterModel} from "./character.model";
import db from "../database/db-connection";

export const PlaceCharacterModel = db.getConnection().define("PlaceCharacter", {
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