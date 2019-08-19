import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Descuento = sequelize.define('descuento',{
    id_descuento:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    descripcion:{
        type: Sequelize.STRING(50)
    },
    descuento:{
        type: Sequelize.FLOAT
    },
    fecha_inicial:{
        type: Sequelize.DATEONLY
    },
    fecha_final:{
        type: Sequelize.DATEONLY
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default Descuento;