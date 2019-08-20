import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Pago = sequelize.define('pago',{
    num_pago:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_factura:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    modo_de_pago:{
        type: Sequelize.STRING(30)
    },
    banco_entidad:{
        type: Sequelize.STRING(50)
    },
    numero_tarjeta_cuenta:{
        type: Sequelize.INTEGER
    },
    monto_del_pago:{
        type: Sequelize.FLOAT
    },
    cuotas: {
        type: Sequelize.FLOAT//EL total de la factura (la suma del precio en detalle factura.)
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default Pago;