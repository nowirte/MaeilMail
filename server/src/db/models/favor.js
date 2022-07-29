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
        defaultValue: false
      },

      language: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      book: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      game: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      coding: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      fantacy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      sports: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      entertainment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      music: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      fashion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      art: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      travel: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }

    },{
        intialAutoIncrement: 1,
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Favors",
        modelName: "Favor",
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
    }

  static associate(db) { 
    db.Favor.belongsTo(db.User, { foreignKey: 'user_id', sourceKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade' });
   }
};

export { Favor };