// import path from 'path';
import Sequelize from 'sequelize';
import {User} from './models/user';
import {Favor} from './models/favor';
import {Letter} from './models/letter';
// import dotenv from 'dotenv';
// const env = process.env.NODE_ENV || 'development';
// const config = require(
//   path.join(__dirname + '..', 'config', 'config.json')
// )[env];
// const config = path.join(''+ '..', 'config', 'config.json')[env];
const db = {};

const sequelize = new Sequelize(process.env.RDS_DB_NAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
  host: process.env.RDS_HOSTNAME,
  dialect: "mysql",
  timezone: "+09:00",
  dialectOptions: {
    charset: "utf8mb4",
    dateStrings: true,
    typeCast: true,
  }
});

db.sequelize = sequelize;

db.User = User;
db.Favor = Favor;
db.Letter = Letter;

User.init(sequelize);
Favor.init(sequelize);
Letter.init(sequelize);

User.associate(db);
Favor.associate(db);
Letter.associate(db);

export { db };
