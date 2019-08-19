import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Comentario = sequelize.define('comentario',{
    id_comentario:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    comentario:{
        type: Sequelize.STRING(50)
    },
    calificacion:{
        type: Sequelize.STRING(2)
    },
    fecha:{
        type: Sequelize.DATE
    },
    id_producto:{
        type: Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default Comentario;