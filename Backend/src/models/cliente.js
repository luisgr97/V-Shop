/*
Los modelos representan una tabla de la
base de datos, esto es necesario para el
funcionamiento del ORM 
*/
import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Usuario from './usuario';

//Asi se especifica un modelo de tabla usando el ORM
const Cliente = sequelize.define('cliente', {
    id_cliente: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    estado: {
        type: Sequelize.BOOLEAN
    },
    clave: {
        type: Sequelize.TEXT
    },
    nick: {
        type: Sequelize.STRING(15)
    },
    tarjeta: {
        type: Sequelize.STRING(20)
    },
    id_usuario: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false,
})

//Se debe especificar el tipo de relacion con la otra tabla
Cliente.hasOne(Usuario)

export default Cliente;