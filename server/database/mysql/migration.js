const {sequelize}=require('./index.js');

sequelize.sync({ alter: true });