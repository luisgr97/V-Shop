import Descuento from '../models/descuento';

// este es un metodo asincrono ya que toma tiempo para crearse, por ende, en funcion se le indica con "async" y en la constante con await, para esperar a su creacion antes de hacer el send
export async function crear(req, res) {
    const { descripcion, descuento, fecha_inicial, fecha_final } = req.body;
    try {
        let newDescuento = await Descuento.create({
            descripcion,
            descuento,
            fecha_inicial,
            fecha_final
        },{
            fields: ['descripcion', 'descuento', 'fecha_inicial', 'fecha_final']
        });
        return res.json({
            message: "descuento creado con exito",
            data : newDescuento
        })
    } catch (e) {
        console.log(e);
        res.status(700).json({
            message: "Something goes wrong 700",
            data: {}
        });
    }
}

export async function get(req, res) {
    try {
        const descuento = await Descuento.findAll({
            attributes: ['id_descuento','descripcion', 'descuento', 'fecha_inicial', 'fecha_final']
        });
        return res.json(descuento);
    } catch (e) {
        console.log(e);
        res.status(701).json({
            message: 'Algo salio mal 701',
            data: {}
        });
    }
}

export async function getOn(req, res) {
    const { id_descuento } = req.params;
    try {
        const oneDescuento = await Descuento.findOne({
            attributes: ['id_descuento','descripcion', 'descuento', 'fecha_inicial', 'fecha_final'],
            where: {
                id_descuento
            }
        });
        return res.json(oneDescuento);
    } catch (e) {
        console.log(e);
        res.status(702).json({
            message: "Algo salio mal 702",
            data: {}
        });
    }
}

export async function deleteOn(req, res) {
    const { id_descuento } = req.params;
    try {
        const numRowDelete = await Descuento.destroy({
            where: {
                id_descuento
            }
        });
        return res.json(numRowDelete);
    } catch (e) {
        console.log(e);
        res.status(703).json({
            message: "Algo salio mal 703",
            data: {}
        });
    }
}

export async function updateOn(req, res) {
    const { id_descuento } = req.params;
    try {
        const { descripcion, descuento, fecha_inicial, fecha_final } = req.body;
        const rowUpdate = await Descuento.update({
            descripcion,
            descuento,
            fecha_inicial,
            fecha_final
        },{
            where: {
                id_descuento
            }
        });
        return res.json(rowUpdate);
    } catch (e) {
        console.log(e);
        res.status(704).json({
            message: "Algo salio mal 704",
            data: {}
        });
    }
}

/*
export async function getOnByProducto(req, res) {
    const { id_producto } = req.params;
    try {
        const comentarios = await Descuento.findAll({
            attributes: ['id_comentario','comentario', 'calificacion', 'fecha', 'id_producto'],
            where: {
                id_producto
            }
        });
        return res.json(comentarios);
    } catch (e) {
        console.log(e);
        res.status(605).json({
            message: "Algo salio mal 605",
            data: {}
        });
    }
}
*/