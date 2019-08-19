import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Imagenes = sequelize.define('imagenes',{
    id_imagen:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_producto:{
        type: Sequelize.INTEGER
    },
    ruta:{
        type: Sequelize.STRING(200)
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default Imagenes;