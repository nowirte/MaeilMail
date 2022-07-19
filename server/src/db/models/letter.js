import { Sequelize, DataTypes } from "sequelize";

class Letter extends Sequelize.Model {
  
  static init(sequelize){
    return super.init({
      letter_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      send_date: {
        type: DataTypes.DATE,
      },

      receive_date: {
        type: DataTypes.DATE,
      },

      send_loction: {
        type: DataTypes.STRING(200),
      },

      receive_location: {
        type: DataTypes.STRING(200),
      },

      content: {
        type: DataTypes.STRING(200),
      }

    },{
        intialAutoIncrement: 1,
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Letters",
        modelName: "Letter"
      }
    );
    }

  static associate(db) { 
    db.Letter.belongsTo(db.User, { foreignKey: 'sendId', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.Letter.belongsTo(db.User, { foreignKey: 'receiveId', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
  }
};

export { Letter };