import { Sequelize, DataTypes } from "sequelize";

class User extends Sequelize.Model {
  
  static init(sequelize){
    return super.init({
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nickname: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
      },

      gender: {
        type: DataTypes.STRING(200), 
        allowNull: false
      },

      birthday: {
        type: DataTypes.DATE,
        allowNull: false
      },

      location: {
        type: DataTypes.STRING(200),
      },

      lantitude: {
        type: DataTypes.DECIMAL(10,8),
      },

      longitude: {
        type: DataTypes.DECIMAL(11,8),
      },

      status: {
        type: DataTypes.STRING(200)
      },

      profileText: {
        type: DataTypes.STRING(200)
      },

      profileImage: {
        type: DataTypes.STRING(200)
      }

    },{
        intialAutoIncrement: 1,
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Users",
        modelName: "User"
      }
    );
    }

  static associate(db) { 
    db.User.hasOne(db.Favor, { foreignKey: 'userId', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.User.hasMany(db.Letter, { foreignKey: 'sendId', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.User.hasMany(db.Letter, { foreignKey: 'receiveId', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
   }
};

export { User };