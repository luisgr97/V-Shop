import Usuario from '../models/usuario';
import { sequelize } from '../database/database';
import Sequelize from 'sequelize';
import Producto from '../models/producto';
import Inventario_catalogo_productos from '../models/inventario_catalogo_productos';
import Detalle_factura from '../models/detalle_factura';
import Factura from '../models/factura';

export async function getBirthDayUsers(req, res) {
    const Op = Sequelize.Op;
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;

    try {
        const users = await Usuario.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(sequelize.literal('extract(month from fecha_de_nacimiento)'), month),
                    sequelize.where(sequelize.literal('extract(day from fecha_de_nacimiento)'), day)
                ]
            }
        });
        return res.json({
            message: "birthday users",
            data: users
        });
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            error: true
        });
    }
}

export async function getProductLessTen(req, res) {
    const Op = Sequelize.Op;
    try {
        const productos = await Producto.findAll({
            include: [{
                model: Inventario_catalogo_productos,
                where: {
                    cantidad_en_inventario: {
                        [Op.lte]: 10 
                    }
                }
            }]
        });
        return res.json({
            message: "less ten",
            data: productos
        });
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            error: true
        });
    }
}

/*
const productos = await Producto.findAll({
            attributes:['id_producto','nombre_producto'],
            include: [{
                model: Detalle_factura,
                attributes:['cantidad_comprada']
            }]
        });
*/

export async function getVentasMesProducto(req, res) {
    const Op = Sequelize.Op;
    var since = "2019-09-12";
    var until = "2019-09-20";
    var id_producto = 1;
    try {
        const productos = await Factura.findAll({
            attributes:[''],
            include: [{
                model: Detalle_factura,
                attributes:[sequelize.col('nombre_producto'),sequelize.fn('COUNT',sequelize.col('cantidad_comprada'))],
                include: [{
                    model: Producto,
                    attributes:[],
                    where: {
                        id_producto
                    }
                }]
            }],
            where:{
                fecha:{
                    [Op.between]:[new Date(since),new Date(until)]
                }
            }
        });
        /*
        for(var i in productos){
            console.log(productos[i].dataValues.Detalle_facturas)
        }
        */
        return res.json({
            message: "sold month",
            data: productos
        });
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            error: true
        });
    }
}

