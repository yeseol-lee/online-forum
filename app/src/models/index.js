"use strict";

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'production';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user.js')(sequelize, Sequelize);
db.Article = require('./article.js')(sequelize, Sequelize);
db.Comment = require('./comment.js')(sequelize, Sequelize);

module.exports = db;

