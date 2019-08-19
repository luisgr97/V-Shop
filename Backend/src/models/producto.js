import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Imagenes from './imagen';
import Comentario from './comentario';
import Inventario_catalogo_productos from './inventario_catalogo_productos';

const Producto = sequelize.define('producto',{
    id_producto:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre_producto:{
        type: Sequelize.STRING(20)
    },
    descripcion:{
        type: Sequelize.STRING(100)
    },
    marca:{
        type: Sequelize.STRING(20)
    },
    precio:{
        type: Sequelize.FLOAT
    },
    id_subcategoria:{
        type: Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true
});

Producto.hasMany(Imagenes,{foreingkey: 'id_producto', sourcekey:'id_producto'});
Imagenes.belongsTo(Producto,{foreingkey: 'id_producto', sourcekey:'id_producto'});

Producto.hasMany(Comentario,{foreingkey: 'id_producto', sourcekey:'id_producto'});
Comentario.belongsTo(Producto,{foreingkey: 'id_producto', sourcekey:'id_producto'});

Producto.belongsTo(Inventario_catalogo_productos,{foreingkey: 'id_producto', sourcekey:'id_producto'});
Inventario_catalogo_productos.hasMany(Producto,{foreingkey: 'id_producto', sourcekey:'id_producto'});

export default Producto;