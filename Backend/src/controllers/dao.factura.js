import Factura from '../models/factura'
import Detalle_factura from '../models/detalle_factura';
import Producto from '../models/producto';
import Pago from '../models/pago'


export async function crearFactura(req, res) {
    const currentDate = new Date().toISOString().split("T")
    const { id_cliente, total, detalles, pagos } = req.body;
    try {
        let nuevaFactura = await Factura.create({
            fecha: currentDate, 
            id_cliente, 
            total
        },{
            fields: ['fecha', 'id_cliente', 'total']
        });
        for(var i=0;i<detalles.length;i++){
            detalles[i].id_factura = nuevaFactura.id_factura
        }
        for(var i=0;i<pagos.length;i++){
            pagos[i].id_factura = nuevaFactura.id_factura
        }

        let detallesFactura =  Detalle_factura.bulkCreate(
            detalles
            ,{
                fields: ['id_factura', 'id_producto', 'id_catalogo', 'cantidad_comprada', 'descuento', 'precio_actual']
            }
        )
        let pagoFactura = Pago.bulkCreate(
            pagos
            ,{
            fields: ['id_factura', 'modo_de_pago', 'banco_entidad', 'numero_tarjeta_cuenta',
            'monto_del_pago','cuotas']
        });

        return res.json({
            message: "Factura creada con exito",           
        })
    } catch (e) {
        console.log(e);
        res.status(200).json({
            message: "Something goes wrong 200",
            error:true
        });
    }
}

export async function getFacturas(req, res) {
    try {
        const factura = await Factura.findAll({
            attributes: ['id_factura','fecha', 'id_cliente', 'total']
        });
        return res.json(factura);
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            data: {}
        });
    }
}

export async function getOnFactura(req, res) {
    const { id_factura } = req.params;
    try {
        const oneFactura = await Factura.findOne({
            attributes: ['id_factura','fecha', 'id_cliente', 'total'],
            where: {
                id_factura
            }
        });
        return res.json(oneFactura);
    } catch (e) {
        console.log(e);
        res.status(202).json({
            message: "Algo salio mal 202",
            data: {}
        });
    }
}

export async function deleteOnFactura(req, res) {
    const { id_factura } = req.params;
    try {
        const numRowDelete = await Factura.destroy({
            where: {
                id_factura
            }
        });
        return res.json(numRowDelete);
    } catch (e) {
        console.log(e);
        res.status(203).json({
            message: "Algo salio mal 203",
            data: {}
        });
    }
}

export async function updateFactura(req, res) {
    const { id_factura } = req.params;
    try {
        const { total } = req.body;
        const factura = await Factura.update({
            total
        },{
            where: {
                id_factura
            }
        });
        return res.json(factura);
    } catch (e) {
        console.log(e);
        res.status(204).json({
            message: "Algo salio mal 204",
            data: {}
        });
    }
}

export async function getJoinDetalles(req, res) {
    try {
        const factura = await Factura.findAll({
            attributes: ['id_factura','fecha','total'],
            include:[{
                model: Detalle_factura,
                attributes: ['num_detalle','cantidad_comprada', 'descuento', 'precio_actual'],
                include:[{
                    model: Producto,
                    attributes: ['id_producto','nombre_producto']
                }]
            }]
        });
        return res.json(factura);
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            data: {}
        });
    }
}
