import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import  Catalogo  from './catalogo';
import Factura from './factura';
import Comentario from './comentario';

//Asi se especifica un modelo de tabla usando el ORM
const Usuario = sequelize.define('usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    tipo_documento: {
        type: Sequelize.STRING(2)
    },
    numero_documento: {
        type: Sequelize.STRING(10)
    },
    nombres: {
        type: Sequelize.STRING(30)
    },
    apellidos: {
        type: Sequelize.STRING(30)
    },
    telefono: {
        type: Sequelize.STRING(10)
    },
    direccion: {
        type: Sequelize.STRING(50)
    },
    fecha_de_nacimiento: {
        type: Sequelize.DATE//type: Sequelize.DATEONLY
    },
    correo: {
        type: Sequelize.STRING(50)
    },
    estado: {
        type: Sequelize.INTEGER
    },
    clave: {
        type: Sequelize.STRING(30)
    },
    nick: {
        type: Sequelize.STRING(30)
    },
    tipo_usuario: {
        type: Sequelize.STRING(50)
    }
},{
    underscored: false,
    timestamps: false,
    freezeTableName: true
});

Usuario.hasOne(Catalogo,{foreignKey: 'id_gerente', sourcekey:'id_usuario'});
Catalogo.belongsTo(Usuario,{foreignKey: 'id_gerente', sourcekey:'id_usuario'});

Usuario.hasMany(Comentario,{foreignKey: 'id_usuario', sourcekey:'id_usuario'});
Comentario.belongsTo(Usuario,{foreignKey: 'id_usuario', sourcekey:'id_usuario'});
Usuario.hasMany(Factura,{foreignKey: 'id_cliente', sourcekey:'id_usuario'});

export default Usuario;
