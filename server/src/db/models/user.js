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
      },

      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      gender: {
        type: DataTypes.STRING(200), 
        allowNull: false
      },

      birthday: {
        type: DataTypes.DATE,
      },

      location: {
        type: DataTypes.STRING(200),
      },

      latitude: {
        type: DataTypes.DECIMAL(10,8),
      },

      longitude: {
        type: DataTypes.DECIMAL(11,8),
      },

      status: {
        type: DataTypes.STRING(200),
        allowNull: false
      },

      profile_text: {
        type: DataTypes.STRING(200)
      },

      profile_image: {
        type: DataTypes.STRING(1234),
        defaultValue: 'https://elice-everymail.s3.ap-northeast-2.amazonaws.com/%C3%A1%C2%84%C2%84%C3%A1%C2%85%C2%AE%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B51658513551791.png'
      },

      oauth: {
        type: DataTypes.STRING(200)
      },

    },{
        intialAutoIncrement: 1,
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Users",
        modelName: "User",
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    );
    }

  static associate(db) { 
    db.User.hasOne(db.Favor, { foreignKey: 'user_id', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.User.hasOne(db.Language, { foreignKey: 'user_id', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' })
    db.User.hasMany(db.Letter, { foreignKey: 'send_id', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.User.hasMany(db.Letter, { foreignKey: 'receive_id', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
   }
};

export { User };