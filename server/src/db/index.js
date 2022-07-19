import Sequelize from 'sequelize';
import {User, Favor, Language, Letter} from './models'

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
db.Language = Language

User.init(sequelize);
Favor.init(sequelize);
Letter.init(sequelize);
Language.init(sequelize)

User.associate(db);
Favor.associate(db);
Letter.associate(db);
Language.associate(db);

export { db };