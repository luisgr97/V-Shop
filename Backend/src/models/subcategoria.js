import Sequelize from 'sequelize';
import {sequelize} from '../database/database';
import Categoria from './categoria';

const SubCategoria = sequelize.define('subcategoria',{
    id_subcategoria: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.STRING(30)
    },
    id_categoria: {
        type: Sequelize.INTEGER,
        references: 'categoria',
        referencesKey: 'id_categoria'
    }
},{
    timestamps: false,    
    underscored: true
});


export default SubCategoria;