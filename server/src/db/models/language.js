import { Sequelize, DataTypes } from 'sequelize';

class Language extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        language_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        afrikaans: {
          type: DataTypes.BOOLEAN,
        },

        chinese: {
          type: DataTypes.BOOLEAN,
        },

        english: {
          type: DataTypes.BOOLEAN,
        },

        french: {
          type: DataTypes.BOOLEAN,
        },

        german: {
          type: DataTypes.BOOLEAN,
        },

        japanese: {
          type: DataTypes.BOOLEAN,
        },

        korean: {
          type: DataTypes.BOOLEAN,
        },

        russian: {
          type: DataTypes.BOOLEAN,
        },

        spanish: {
          type: DataTypes.BOOLEAN,
        },

        uzbek: {
          type: DataTypes.BOOLEAN,
        },
      },
      {
        intialAutoIncrement: 1,
        sequelize,
        timestamps: true,
        charset: 'utf8', // 한국어 설정
        collate: 'utf8_general_ci', // 한국어 설정
        tableName: 'Languages',
        modelName: 'Language',
      }
    );
  }

  static associate(db) {
    db.Language.belongsTo(db.User, {
      foreignKey: 'userId',
      sourceKey: 'user_id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

export { Language };
