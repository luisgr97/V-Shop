import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Inventario from '../models/inventario_catalogo_productos';

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

Descuento.hasMany(Inventario,{foreignKey: 'id_descuento', sourcekey:'id_descuento'});
Inventario.belongsTo(Descuento,{foreignKey: 'id_descuento', sourcekey:'id_descuento'});



export default Descuento;