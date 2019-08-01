import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import SubCategoria from './subcategoria';

const Categoria = sequelize.define('categoria',{
    id_categoria:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.STRING(30)
    }
},{
    timestamps: false,
    freezeTableName: true
});

Categoria.hasMany(SubCategoria,{foreingkey: 'id_categoria', sourcekey:'id_categoria'});
SubCategoria.belongsTo(Categoria,{foreingkey: 'id_categoria', sourcekey:'id_categoria'});

export default Categoria;
