/**
 Este archivo realiza la conexion con la base
 de datos mediante el ORM sequelize
*/
import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
    'postgres', //Database
    'postgres', // username
    '', //pass
    {
        host: 'localhost',
        dialect: 'postgres', //El tipo de SGBD
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

//Conecta con la base de postgres
export function encender() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}