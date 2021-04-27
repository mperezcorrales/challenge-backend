const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:  process.env.DB_DIALECT
});

export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

const Employee = sequelize.define('Employee', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    age: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
    }
}, {
    // Other model options go here
    tableName: 'Employees',
    timestamps: true
});

// `sequelize.define` also returns the model
console.log(Employee === sequelize.models.Employee); // true

(async () => {
    await sequelize.sync({ alter: true }); // Syncs for creation of table if they don't exist
    // Code here

    /*const jane = Employee.build({ firstName: "Jane", lastName: "Perez"});
    console.log(jane instanceof Employee); // true
    console.log(jane.name); // "Jane"

    await jane.save(); // Saves or inserts this record

    await Employee.create({firstName: "Bob", lastName: "Perez"})*/

    /*let employees = await Employee.findAll();
    console.log(employees.every((employee: any) => employee instanceof Employee)); // true
    console.log("All employees:", JSON.stringify(employees, null, 2));

    employees = await Employee.findAll({
        where: {
            firstName: 'Jane'
        }
    });
    console.log(employees.every((employee: any) => employee instanceof Employee)); // true
    console.log("All employees:", JSON.stringify(employees, null, 2));*/
})();
