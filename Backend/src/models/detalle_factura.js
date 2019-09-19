import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Detalle_factura = sequelize.define('detalle_factura',{
    num_detalle:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_factura:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_producto:{
        type: Sequelize.INTEGER
    },
    id_catalogo:{
        type: Sequelize.INTEGER
    },
    cantidad_comprada: {
        type: Sequelize.INTEGER//cantidad a comprar
    },
    descuento: {
        type: Sequelize.FLOAT
    },
    precio_actual: {
        type: Sequelize.FLOAT
    },
},{
    timestamps: false,
    freezeTableName: true
});

export default Detalle_factura;