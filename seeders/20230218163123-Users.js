'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [
        {
          id: 1,
          firstname: 'Fatima',
          lastname: 'Bakali',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          firstname: 'Jane',
          lastname: 'Johnson',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
    }
  };
