import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Detalle_factura from './detalle_factura';
import Pago from './pago';

const Factura = sequelize.define('factura',{
    id_factura:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fecha:{
        type: Sequelize.DATE
    },
    id_cliente:{
        type: Sequelize.INTEGER
    },
    id_catalogo:{
        type: Sequelize.INTEGER
    },
    total: {
        type: Sequelize.FLOAT//EL total de la factura (la suma del precio en detalle factura.)
    }
},{
    timestamps: false,
    freezeTableName: true
});

//Factura.belongsTo(Detalle_factura,{foreingkey: 'id_factura', sourcekey:'id_factura'});
//Inventario_catalogo_productos.hasMany(Factura,{foreingkey: 'id_factura', sourcekey:'id_factura'});

Factura.hasMany(Detalle_factura,{foreignKey: 'id_factura', sourcekey:'id_factura'});
//Factura.belongsTo(Pago,{foreignKey: 'id_factura', sourcekey:'id_factura'});
//Pago.hasMany(Factura,{foreignKey: 'id_factura', sourcekey:'id_factura'});

export default Factura;