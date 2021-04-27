import { Sequelize } from 'sequelize';
import * as configList from '../config/config.json';

const env = process.env.NODE_ENV || 'development';
const config = configList[env];

const  sequelize = config.url ? new Sequelize(config.url, config) : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };