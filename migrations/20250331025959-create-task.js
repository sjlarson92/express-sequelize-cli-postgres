'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('task');
  }
};