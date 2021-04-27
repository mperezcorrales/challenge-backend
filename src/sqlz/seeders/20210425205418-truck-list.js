'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('trucks', [
            {
                geo_location: JSON.stringify({latitude: 52.357, longitude: 4.832}),
                license_plate: '29-KTV-7',
                allowed_weight: 35,
                current_cargo_weight: 25,
                current_number_of_pallets: 2,
                max_number_of_pallets: 13,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                geo_location: JSON.stringify({latitude: 52.300, longitude: 4.975}),
                license_plate: '60-PJR-3',
                allowed_weight: 40,
                current_cargo_weight: 20,
                current_number_of_pallets: 5,
                max_number_of_pallets: 10,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                geo_location: JSON.stringify({latitude: 52.026, longitude: 4.276}),
                license_plate: '01-GO-RL',
                allowed_weight: 38,
                current_cargo_weight: 26,
                current_number_of_pallets: 5,
                max_number_of_pallets: 10,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                geo_location: JSON.stringify({latitude: 51.515, longitude: 6.961}),
                license_plate: 'CD-54-15',
                allowed_weight: 18,
                current_cargo_weight: 13,
                current_number_of_pallets: 5,
                max_number_of_pallets: 7,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                geo_location: JSON.stringify({latitude: 53.190, longitude: 6.602}),
                license_plate: 'XG-SF-67',
                allowed_weight: 35,
                current_cargo_weight: 10,
                current_number_of_pallets: 3,
                max_number_of_pallets: 15,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                geo_location: JSON.stringify({latitude: 51.201, longitude: 6.436}),
                license_plate: '4-TLZ-23',
                allowed_weight: 30,
                current_cargo_weight: 15,
                current_number_of_pallets: 6,
                max_number_of_pallets: 11,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('trucks', null, {});
    }
};
