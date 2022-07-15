import { Sequelize, DataTypes } from 'sequelize';

class Letter extends Sequelize.Model {

    static init(sequelize) {
        return super.init({
            letter_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            }
        }, {
            initialAutoIncrement: 1,
            sequelize,
            timestamps: true,
            
        })
    }
}

export { Letter }