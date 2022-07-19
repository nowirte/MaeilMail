import Sequelize from 'sequelize';
import {User} from './models/user';
import {Favor} from './models/favor';
import {Letter} from './models/letter';

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
