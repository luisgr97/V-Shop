import Usuario from '../models/usuario';
import { sequelize } from '../database/database';
import Sequelize from 'sequelize';
import Producto from '../models/producto';
import Inventario_catalogo_productos from '../models/inventario_catalogo_productos';
import Detalle_factura from '../models/detalle_factura';
import Factura from '../models/factura';
import Catalogo from '../models/catalogo';

//Informe #219
/*
    Usuairos que cumplen años en el dia en curso, segun el enunciado, debe ser en todo el mes
*/
export async function getBirthDayUsers(req, res) {
    const Op = Sequelize.Op;
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;

    try {
        const users = await Usuario.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(sequelize.literal('extract(month from fecha_de_nacimiento)'), month)//,
                    //sequelize.where(sequelize.literal('extract(day from fecha_de_nacimiento)'), day)
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

//Informe #218
/*
    Retorna los productos que tienen menos de 10 en stock, en toda la tienda
*/
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

//Informe #217A
/*
    Las ventas totales de un producto detallado por el dia de la venta, indicando las unidades vendidas
*/
export async function getVentasMesProducto(req, res) {
    const { since, until, id_producto } = req.body;
    const Op = Sequelize.Op;
    try {
        const productos = await Factura.findAll({
            attributes: ['fecha',[sequelize.fn('sum', sequelize.col('detalle_facturas.cantidad_comprada')), 'unidades_vendidas'],[sequelize.fn('sum', sequelize.col('detalle_facturas.precio_actual')), 'ventas_dia']],
            include:[{
                model: Detalle_factura,
                attributes:[],
                where:{
                    id_producto
                }
            }],
            where: {
                fecha: {
                    [Op.between]: [new Date(since), new Date(until)]
                }
            },
            group:['fecha']
            ,
            raw: true
        });
        return res.json(productos);
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            error: true
        });
    }
}


//Informe #217B
/*
    Ventas de un producto en especifo, determinado por un rango de fecha.
    Nota: Lo dejare como total de ventas diarias de cierto producto
*/
export async function getVentasTotalesMesProducto(req, res) {
    const { since, until, id_producto } = req.body;
    const Op = Sequelize.Op;
    /*
    var since = "2019-09-12";
    var until = "2019-09-20";
    var id_producto = 1;
    */
    try {
        const productos = await Factura.findAll({
            include: [{
                model: Detalle_factura,
                include: [{
                    model: Producto,
                    where: {
                        id_producto
                    }
                }, {
                    model: Catalogo
                }]
            }],
            where: {
                fecha: {
                    [Op.between]: [new Date(since), new Date(until)]
                }
            },
            raw: true
        });
        console.log(productos);
        //console.log("------------------------------------");
        /*var response = {
            id_producto: "",
            nombre_producto: "",
            id_catalogo: 0,
            cantidad_vendida: 0
        };*/

        var responseVector = [];

        for (var i in productos) {
            var f = productos[i];
            if (!buscarCatalogo(f["detalle_facturas.id_catalogo"], responseVector) && (f["detalle_facturas.id_catalogo"] != null)) {
                var evento = new Object();
                evento.id_catalogo = f["detalle_facturas.id_catalogo"];
                evento.ciudad_catalogo = f["detalle_facturas.catalogo.ciudad"];
                evento.nombre_catalogo = f["detalle_facturas.catalogo.nombre_catalogo"];
                evento.id_producto = f["detalle_facturas.producto.id_producto"];
                evento.nombre_producto = f["detalle_facturas.producto.nombre_producto"];
                evento.cantidad_vendida = 0;
                responseVector.push(evento);
            }

            responseVector.map(function (dato) {
                if (dato.id_catalogo == f["detalle_facturas.id_catalogo"]) {
                    dato.cantidad_vendida += f["detalle_facturas.cantidad_comprada"];
                }

                return dato;
            });
        }
        return res.json(responseVector);
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            error: true
        });
    }
}


//Informe #217C
/*
    Ventas de toda la tienda por un rango de fecha
    (No se si se deben generar de ventas diarias o el total de las ventas),
    Lo dejare como total ventas mes detallando las ventas por dia
*/
export async function getVentasMesTienda(req, res) {
    const { since, until } = req.body;
    const Op = Sequelize.Op;
    try {
        const productos = await Factura.findAll({
            attributes: ['fecha',[sequelize.fn('sum', sequelize.col('total')), 'ventas_dia']],
            where: {
                fecha: {
                    [Op.between]: [new Date(since), new Date(until)]
                }
            },
            group:['fecha']
            //,
            //raw: true
        });
        return res.json(productos);
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            error: true
        });
    }
}

function buscarCatalogo(id_catalogo, arrayobjetivo) {
    for (var i in arrayobjetivo) {
        if (arrayobjetivo[i].id_catalogo == id_catalogo) {
            return true;
        }
    }
    return false;
}

//Informe #216
/*
    Menos vendidos de toda la tienda
    En el documento la profesora no expecifica si los menos vendidos de cada sede
*/
/*
    const ventas = await Catalogo.findAll({
            attributes: ['catalogo.id_catalogo','detalle_factura.id_producto','detalle_factura->producto.nombre_producto',[sequelize.fn('sum', sequelize.col('cantidad_comprada')), 'total_ventas']],
            include:[{
                model: Detalle_factura, as: 'detalle_factura',
                attributes: [],
                include: [{
                    model: Producto, as: 'producto',
                    attributes:[]
                }]
            }],
            group: ['catalogo.id_catalogo', 'detalle_factura.id_producto','detalle_factura->producto.nombre_producto'],
            order: sequelize.literal('total_ventas'),
            raw: true
        });
*/
export async function getMenosVendidos(req, res) {
    const Op = Sequelize.Op;
    try {
        const ventas = await Detalle_factura.findAll({
            attributes: ['producto.id_producto','producto.nombre_producto',[sequelize.fn('sum', sequelize.col('cantidad_comprada')), 'total_ventas']],
            include:[{
                model: Producto,
                attributes: []
            }],
            group: ['producto.id_producto'],
            order: sequelize.literal('total_ventas'),
            raw: true
        });
        return res.json({
            message: "10 menos vendidos",
            data: ventas
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
    Retorna los productos menos vendidos para determindado catalogo
*/
export async function getMenosVendidosPorSede(req, res) {
    const Op = Sequelize.Op;
    const { id_catalogo } = req.params;
    try {
        const ventas = await Catalogo.findAll({
            attributes: ['catalogo.id_catalogo','detalle_factura.id_producto','detalle_factura->producto.nombre_producto',[sequelize.fn('sum', sequelize.col('cantidad_comprada')), 'total_ventas']],
            include:[{
                model: Detalle_factura, as: 'detalle_factura',
                attributes: [],
                include: [{
                    model: Producto, as: 'producto',
                    attributes:[]
                }]
            }],
            where:{
                id_catalogo
            },
            group: ['catalogo.id_catalogo', 'detalle_factura.id_producto','detalle_factura->producto.nombre_producto'],
            order: sequelize.literal('total_ventas'),
            raw: true
        });
        return res.json({
            message: "10 menos vendidos",
            data: ventas
        });
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            error: true
        });
    }
}

//Informe #216
/*
    Despliega los clientes que mas compran en manera desendente
*/
export async function getMejoresClientes(req, res) {
    const Op = Sequelize.Op;
    try {
        const productos = await Factura.findAll({
            attributes: ['id_cliente','usuario.nombres','usuario.apellidos',[sequelize.fn('sum', sequelize.col('total')), 'total_compras']],
            include: [{
                model: Usuario,
                attributes:[]
            }],
            group:['id_cliente','usuario.nombres','usuario.apellidos'],
            order: sequelize.literal('total_compras DESC')
            ,raw: true
        });
        return res.json(productos);
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            error: true
        });
    }
}

//Informe #213
/*
    Productos mas vendidos en la sede que se especifque
*/
export async function getMasVendidosPorSede(req, res) {
    const { id_catalogo } = req.params;
    const Op = Sequelize.Op;
    try {
        const ventas = await Catalogo.findAll({
            attributes: ['catalogo.id_catalogo','detalle_factura.id_producto','detalle_factura->producto.nombre_producto',[sequelize.fn('sum', sequelize.col('cantidad_comprada')), 'total_ventas']],
            include:[{
                model: Detalle_factura, as: 'detalle_factura',
                attributes: [],
                include: [{
                    model: Producto, as: 'producto',
                    attributes:[]
                }]
            }],
            where:{
                id_catalogo
            },
            group: ['catalogo.id_catalogo', 'detalle_factura.id_producto','detalle_factura->producto.nombre_producto'],
            order: sequelize.literal('total_ventas DESC'),
            raw: true
        });
        return res.json({
            message: "10 mas vendidos",
            data: ventas
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
    Productos mas vendidos en toda la tienda
*/
export async function getMasVendidos(req, res) {
    const Op = Sequelize.Op;
    try {
        const ventas = await Detalle_factura.findAll({
            attributes: ['producto.id_producto','producto.nombre_producto',[sequelize.fn('sum', sequelize.col('cantidad_comprada')), 'total_ventas']],
            include:[{
                model: Producto,
                attributes: []
            }],
            group: ['producto.id_producto'],
            order: sequelize.literal('total_ventas DESC'),
            raw: true
        });
        return res.json({
            message: "10 mas vendidos DESC",
            data: ventas
        });
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            error: true
        });
    }
}




