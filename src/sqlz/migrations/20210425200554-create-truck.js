'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trucks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      geo_location: {
        type: Sequelize.JSON
      },
      license_plate: {
        type: Sequelize.STRING(15),
        unique: true
      },
      allowed_weight: {
        type: Sequelize.NUMERIC
      },
      current_cargo_weight: {
        type: Sequelize.NUMERIC
      },
      current_number_of_pallets: {
        type: Sequelize.INTEGER
      },
      max_number_of_pallets: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('trucks');
  }
};