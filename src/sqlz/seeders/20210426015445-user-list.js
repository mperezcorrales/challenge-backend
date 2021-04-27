'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
                username: 'admin',
                password: 'adminpw',
                role: 'admin',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                username: 'carrieruser',
                password: 'carrierpw',
                role: 'carrier',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                username: 'shipperuser',
                password: 'shipperpw',
                role: 'shipper',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
