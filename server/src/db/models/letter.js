import { Sequelize, DataTypes } from "sequelize";

class Letter extends Sequelize.Model {
  
  static init(sequelize){
    return super.init({
      letterId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'letter_id'
      },

      sendDate: {
        type: DataTypes.STRING(1234),
        field: 'send_date',
      },

      receiveDate: {
        type: DataTypes.STRING(1234),
        field: 'receive_date',
      },

      sendLocation: {
        type: DataTypes.STRING(1234),
        field: 'send_location'
      },

      receiveLocation: {
        type: DataTypes.STRING(1234),
        field: 'receive_location'
      },

      content: {
        type: DataTypes.STRING(1234),
      },

      isRead: {
        type: DataTypes.BOOLEAN,
        field: 'is_read'
      },

      
      isArrived: {
        type: DataTypes.BOOLEAN,
        field: 'is_arrived'
      }

    },{
        intialAutoIncrement: 1,
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Letters",
        modelName: "Letter",
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    );
    }

  static associate(db) { 
    db.Letter.belongsTo(db.User, { foreignKey: 'send_id', sourceKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade' });
    db.Letter.belongsTo(db.User, { foreignKey: 'receive_id', sourceKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade' });
  }
};

export { Letter };