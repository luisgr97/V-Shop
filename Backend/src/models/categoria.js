import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import SubCategoria from './subcategoria';

const Categoria = sequelize.define('categoria',{
    id_categoria:{
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    nombre_categoria:{
        type: Sequelize.STRING(30)
    }

},{
    underscored: false,
    timestamps: false,
    freezeTableName: true
});

Categoria.hasMany(SubCategoria,{foreignKey: 'id_categoria', sourcekey:'id_categoria'});
SubCategoria.belongsTo(Categoria,{as: 'categoria', foreignKey: 'id_categoria', sourcekey:'id_categoria'});

export default Categoria;
