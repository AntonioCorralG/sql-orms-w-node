const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Person extends Sequelize.Model {}
    Person.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          firstName: {
            type:Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'Please provide a value for "firstName"',
              },
              notEmpty: {
                msg: 'Please provide a value for "firstName"',
              },
            },
          },
          lastName: {
            type:Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'Please provide a value for "lastName"',
              },
              notEmpty: {
                msg: 'Please provide a value for "lastName"',
              },
            },
          },
        }, { 
            // timestamps: false, <--model options
                // freezeTableName: true,
                modelName: 'person',
             sequelize });
        
          return Person;
        };