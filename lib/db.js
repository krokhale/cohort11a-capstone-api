const {Sequelize} = require('sequelize');
// You can choose to connect to sqlite here if you wish to
// Also, if you are using mysql on your local machine you need to update the credentials below
const sequelize = new Sequelize('mysql://root:password@localhost/cohort11a-capstone-api', {logging: false});
module.exports = {sequelize};
