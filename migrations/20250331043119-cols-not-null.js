'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('task', 'name', {
            type: Sequelize.STRING,
            allowNull: false
        })

        await queryInterface.changeColumn('task', 'is_completed', {
            type: Sequelize.BOOLEAN,
            allowNull: false
        })

        await queryInterface.changeColumn('task', 'description', {
            type: Sequelize.STRING,
            allowNull: false
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('task', 'name', {
            type: Sequelize.STRING,
            allowNull: true
        })

        await queryInterface.changeColumn('task', 'is_completed', {
            type: Sequelize.BOOLEAN,
            allowNull: true
        })

        await queryInterface.changeColumn('task', 'description', {
            type: Sequelize.STRING,
            allowNull: true
        })
    }
};
