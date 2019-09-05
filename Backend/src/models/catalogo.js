import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Inventario_catalogo_productos from './inventario_catalogo_productos';

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

Catalogo.hasMany(Inventario_catalogo_productos,{foreignKey: 'id_catalogo', sourcekey:'id_catalogo'});

export default Catalogo;