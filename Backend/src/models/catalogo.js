import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Catalogo = sequelize.define('catalogo',{
    id_catalogo:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    ciudad:{
        type: Sequelize.STRING(30)
    },
    id_gerente:{
        type: Sequelize.INTEGER
    },
    nombre_catalogo:{
        type: Sequelize.STRING(30)
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default Catalogo;