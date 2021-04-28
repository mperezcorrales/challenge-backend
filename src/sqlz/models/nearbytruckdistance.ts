import {BuildOptions, DataTypes, Model} from 'sequelize'
import {sequelize} from "./index";

export interface NearbyTruckDistanceAttributes {
  readonly id: number;
  default_distance: number;
  role: string;
}

interface NearbyTruckDistanceInstance extends Model<NearbyTruckDistanceAttributes>, NearbyTruckDistanceAttributes {
  created_at?: Date;
  updated_at?: Date;
}

export type NearbyTruckDistanceStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): NearbyTruckDistanceInstance;
};

export const NearbyTruckDistanceModel = <NearbyTruckDistanceStatic>sequelize.define('nearby_truck_distance', {
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  default_distance: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
}, {
  // Other model options go here
  tableName: 'nearby_truck_distance',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});