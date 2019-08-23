import Sequelize from 'sequelize';
import {sequelize} from '../database/database';
import  Producto  from './producto';
import Categoria from './categoria';

const SubCategoria = sequelize.define('subcategoria',{
    id_subcategoria: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre_subcategoria:{
        type: Sequelize.STRING(50)
    },
    linkimagen:{
        type: Sequelize.STRING(100)
    },
    id_categoria: {
        type: Sequelize.INTEGER,
        //references:{
          //  model: Categoria,
            //key: 'id_categoria'
        references: 'categoria',
        referencesKey: 'id_categoria'
        //}
    }
},{
    underscored: false,
    timestamps: false,
    freezeTableName: true
});

SubCategoria.hasMany(Producto,{foreignKey: 'id_subcategoria', sourcekey:'id_subcategoria'});
//Producto.belongsTo(SubCategoria,{foreignKey: 'id_subcategoria', sourcekey:'id_subcategoria'});

export default SubCategoria;