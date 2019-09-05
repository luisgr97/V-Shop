import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Imagenes from './imagen';
import Comentario from './comentario';
import Inventario_catalogo_productos from './inventario_catalogo_productos';
import Detalle_factura from './detalle_factura';
//import SubCategoria from './subcategoria';

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

Producto.hasMany(Imagenes,{foreignKey: 'id_producto', sourcekey:'id_producto'});
//Imagenes.belongsTo(Producto,{foreignKey: 'id_producto', sourcekey:'id_producto'});

Producto.hasMany(Comentario,{foreignKey: 'id_producto', sourcekey:'id_producto'});
Comentario.belongsTo(Producto, {foreignKey: 'id_producto', sourcekey:'id_producto'})
//Comentario.belongsTo(Producto,{foreignKey: 'id_producto', sourcekey:'id_producto'});

//Producto.hasMany(Inventario_catalogo_productos,{foreignKey: 'id_producto', sourcekey:'id_producto'});
Inventario_catalogo_productos.belongsTo(Producto,{foreignKey: 'id_producto', sourcekey:'id_producto'});

Producto.hasMany(Detalle_factura,{foreignKey: 'id_producto', sourcekey:'id_producto'});
Detalle_factura.belongsTo(Producto,{foreignKey: 'id_producto', sourcekey:'id_producto'});

//Producto.belongsTo(SubCategoria,{foreignKey: 'id_producto', sourcekey:'id_producto'});

export default Producto;