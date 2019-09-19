import Detalle_factura from '../models/detalle_factura';

export async function addOne(req, res) {
    const { //num_detalle,
            id_factura, id_producto, cantidad_comprada, precio_actual} = req.body;
    try {
         
        //adiciona el producto al detalle
        let newCompra = await Detalle_factura.create({
            //num_detalle, es auto generado
            id_factura,
            id_producto,
            cantidad_comprada,
            precio_actual
        },{
            fields: ['id_factura', 'id_producto', 'cantidad_comprada', 'precio_actual']
        });
        return res.json({
            message: "producto add con exito",
            data : newCompra
        })
    } catch (e) {
        console.log(e);
        res.status(900).json({
            message: "Something goes wrong 900",
            data: {}
        });
    }
}

export async function get(req, res) {
    try {
        const consulta = await Detalle_factura.findAll({
            attributes: ['num_detalle', 'id_factura', 'id_catalogo', 'id_producto',
             'cantidad_comprada', 'precio_actual']
        });
        return res.json(consulta);
    } catch (e) {
        console.log(e);
        res.status(901).json({
            message: 'Algo salio mal 901',
            data: {}
        });
    }
}

export async function getOn(req, res) {
    const { num_detalle } = req.params;
    try {
        const consulta = await Detalle_factura.findOne({
            attributes: ['num_detalle', 'id_factura', 'id_producto',
            'cantidad_comprada', 'precio_actual'],
            where: {
                num_detalle
            }
        });
        return res.json(consulta);
    } catch (e) {
        console.log(e);
        res.status(902).json({
            message: "Algo salio mal 902",
            data: {}
        });
    }
}



export async function deleteOn(req, res) {
    const { num_detalle } = req.params;
    try {
        const numRowDelete = await Detalle_factura.destroy({
            where: {
                num_detalle
            }
        });
        return res.json(numRowDelete);
    } catch (e) {
        console.log(e);
        res.status(903).json({
            message: "Algo salio mal 903",
            data: {}
        });
    }
}

export async function updateOn(req, res) {
    const { num_detalle } = req.params;
    try {
        const { cantidad_comprada } = req.body;
        const actualizaProduc = await Detalle_factura.update({
           cantidad_comprada
        },{
            where: {
                num_detalle
            }
        });
        return res.json(actualizaProduc);
    } catch (e) {
        console.log(e);
        res.status(904).json({
            message: "Algo salio mal 904",
            data: {}
        });
    }
}