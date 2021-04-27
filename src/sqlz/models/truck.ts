import {BuildOptions, DataTypes, Model} from 'sequelize'
import {sequelize} from "./index";
import {GeoLocation} from "../../interfaces";

export interface TruckAttributes {
    readonly id: number;
    geo_location: GeoLocation;
    license_plate: string;
    allowed_weight: number;
    current_cargo_weight: number;
    current_number_of_pallets: number;
    max_number_of_pallets: number;
}

interface TruckInstance extends Model<TruckAttributes>, TruckAttributes {
    created_at?: Date;
    updated_at?: Date;
}

export type TruckStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): TruckInstance;
};

export const TruckModel = <TruckStatic>sequelize.define('truck', {
    // Model attributes are defined here
    geo_location: {
        type: DataTypes.JSON,
    },
    license_plate: {
        type: DataTypes.STRING,
    },
    allowed_weight: {
        type: DataTypes.NUMBER,
    },
    current_cargo_weight: {
        type: DataTypes.NUMBER,
    },
    current_number_of_pallets: {
        type: DataTypes.NUMBER,
    },
    max_number_of_pallets: {
        type: DataTypes.NUMBER,
    },
}, {
    // Other model options go here
    tableName: 'trucks',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});