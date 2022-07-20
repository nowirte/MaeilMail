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

      send_location: {
        type: DataTypes.STRING(1234),
      },

      receive_location: {
        type: DataTypes.STRING(1234),
      },

      content: {
        type: DataTypes.STRING(1234),
      },

      is_read: {
        type: DataTypes.BOOLEAN
      },

      
      is_arrived: {
        type: DataTypes.BOOLEAN
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