import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Producto = sequelize.define('producto',{
    codigo_producto:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.STRING(30)
    },
    imagen_url:{
        type: Sequelize.STRING(100)
    },
    empresa_fabricante:{
        type: Sequelize.STRING(30)
    },
    descripcion:{
        type: Sequelize.TEXT
    },
    precio_unitario:{
        type: Sequelize.FLOAT
    },
    descuento:{
        type: Sequelize.FLOAT
    },
    iva:{
        type: Sequelize.FLOAT
    },
    unidades_disponibles:{
        type: Sequelize.INTEGER
    },
    detalles:{
        type: Sequelize.TEXT
    },
    id_subcategoria:{
        type: Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default Producto;