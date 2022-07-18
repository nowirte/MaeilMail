import { Sequelize, DataTypes } from "sequelize";

class Favor extends Sequelize.Model {
  
  static init(sequelize){
    return super.init({
      favor_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      movie: {
        type: DataTypes.BOOLEAN,
      },

      language: {
        type: DataTypes.BOOLEAN,
      },

      book: {
        type: DataTypes.BOOLEAN,
      },

      game: {
        type: DataTypes.BOOLEAN,
      },

      coding: {
        type: DataTypes.BOOLEAN,
      },

      fantacy: {
        type: DataTypes.BOOLEAN,
      },

      sports: {
        type: DataTypes.BOOLEAN,
      },

      entertainment: {
        type: DataTypes.BOOLEAN,
      },

      music: {
        type: DataTypes.BOOLEAN
      },

      fashion: {
        type: DataTypes.BOOLEAN
      },

      art: {
        type: DataTypes.BOOLEAN
      },

      travel: {
        type: DataTypes.BOOLEAN
      }

    },{
        intialAutoIncrement: 1,
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Favors",
        modelName: "Favor"
      }
    );
    }

  static associate(db) { 
    db.Favor.belongsTo(db.User, { foreignKey: 'userId', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
   }
};

export { Favor };