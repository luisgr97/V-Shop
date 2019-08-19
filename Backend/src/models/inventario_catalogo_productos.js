import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Inventario_catalogo_productos = sequelize.define('inventario_catalogo_productos',{
    id_producto:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cantidad_en_inventario:{
        type: Sequelize.INTEGER
    },
    id_descuento:{
        type: Sequelize.INTEGER,
    },id_catalogo:{
        type: Sequelize.INTEGER,
        primaryKey: true
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default Inventario_catalogo_productos;