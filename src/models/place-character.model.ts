import {DataTypes} from "sequelize";
import {PlaceModel} from "./place.model";
import {CharacterModel} from "./character.model";
import db from "../database/db-connection";

export const PlaceCharacterModel = db.getConnection().define("PlaceCharacter", {
    /*id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },*/
    /*place_id: {
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
    }*/
}, { tableName: "place_character"});

PlaceModel.belongsToMany(CharacterModel, { through: 'PlaceCharacter', foreignKey: "place_id" });
CharacterModel.belongsToMany(PlaceModel, { through: 'PlaceCharacter', foreignKey: "character_id" });
