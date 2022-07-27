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
          defaultValue: false
        },

        chinese: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },

        english: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },

        french: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },

        german: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },

        japanese: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },

        korean: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },

        russian: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },

        spanish: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },

        uzbek: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
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
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    );
  }

  static associate(db) {
    db.Language.belongsTo(db.User, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

export { Language };