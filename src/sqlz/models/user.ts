import {BuildOptions, DataTypes, Model} from 'sequelize'
import {sequelize} from "./index";

export interface UserAttributes {
  readonly id?: number;
  username: string;
  password: string;
  role: string;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {
  created_at?: Date;
  updated_at?: Date;
}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};

export const UserModel = <UserStatic>sequelize.define('user', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
}, {
  // Other model options go here
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});