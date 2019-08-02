import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

//Asi se especifica un modelo de tabla usando el ORM
const Usuario = sequelize.define('usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    documento: {
        type: Sequelize.STRING(2)
    },
    numero: {
        type: Sequelize.STRING(10)
    },
    nombres: {
        type: Sequelize.STRING(50)
    },
    apellidos: {
        type: Sequelize.STRING(50)
    },
    telefono: {
        type: Sequelize.STRING(10)
    },
    direccion: {
        type: Sequelize.STRING(50)
    },
    cumpleanos: {
        type: Sequelize.DATEONLY
    },
    nacimiento: {
        type: Sequelize.DATEONLY
    },
    correo: {
        type: Sequelize.STRING(50)
    }
}, {
    freezeTableName: true,
    timestamps: false
})


export default Usuario;