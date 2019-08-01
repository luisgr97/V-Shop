import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const SubCategoria = sequelize.define('subcategoria',{
    id_subcategoria: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.STRING(30)
    },
    id_categoria: {
        type: Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default SubCategoria;