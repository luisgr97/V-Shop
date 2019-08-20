import Pago from '../models/pago'


export async function addOne(req, res) {
    const { //num_detalle,
            id_factura, modo_de_pago, banco_entidad, numero_tarjeta_cuenta, monto_del_pago,
             cuotas} = req.body;
    try {
         
        //adiciona el producto al detalle
        let newPago = await Pago.create({
            //num_detalle, es auto generado
            id_factura,
            modo_de_pago,
            banco_entidad,
            numero_tarjeta_cuenta,
            monto_del_pago,
            cuotas
        },{
            fields: ['id_factura', 'modo_de_pago', 'banco_entidad', 'numero_tarjeta_cuenta',
            'monto_del_pago','cuotas']
        });
        return res.json({
            message: "pago add con exito",
            data : newPago
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
        const consulta = await Pago.findAll({
            attributes: ['num_pago','id_factura', 'modo_de_pago', 'banco_entidad', 'numero_tarjeta_cuenta',
            'monto_del_pago','cuotas']
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
    const { num_pago } = req.params;
    try {
        const consulta = await Pago.findOne({
            attributes: ['num_pago','id_factura', 'modo_de_pago', 'banco_entidad', 'numero_tarjeta_cuenta',
            'monto_del_pago','cuotas'],
            where: {
                num_pago
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
    const { num_pago } = req.params;
    try {
        const numRowDelete = await Pago.destroy({
            where: {
                num_pago
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
    const { num_pago } = req.params;
    try {
        const { modo_de_pago, banco_entidad, numero_tarjeta_cuenta, monto_del_pago,
            cuotas } = req.body;
        const actualizaPago = await Pago.update({
            modo_de_pago, banco_entidad, numero_tarjeta_cuenta, monto_del_pago,
            cuotas
        },{
            where: {
                num_pago
            }
        });
        return res.json(actualizaPago);
    } catch (e) {
        console.log(e);
        res.status(904).json({
            message: "Algo salio mal 904",
            data: {}
        });
    }
}