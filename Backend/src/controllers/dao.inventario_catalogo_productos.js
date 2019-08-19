import Inventario from '../models/inventario_catalogo_productos';

// este es un metodo asincrono ya que toma tiempo para crearse, por ende, en funcion se le indica con "async" y en la constante con await, para esperar a su creacion antes de hacer el send
export async function crear(req, res) {
    const { id_producto, cantidad_en_inventario, id_descuento, id_catalogo } = req.body;
    try {
        let newInventario = await Inventario.create({
            id_producto,
            cantidad_en_inventario,
            id_descuento,
            id_catalogo
        },{
            fields: ['id_producto', 'cantidad_en_inventario', 'id_descuento', 'id_catalogo']
        });
        return res.json({
            message: "inventario add con exito",
            data : newInventario
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
        const consulta = await Inventario.findAll({
            attributes: ['id_producto', 'cantidad_en_inventario', 'id_descuento', 'id_catalogo']
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
    const { id_producto, id_catalogo } = req.params;
    try {
        const consulta = await Inventario.findOne({
            attributes: ['id_producto', 'cantidad_en_inventario', 'id_descuento', 'id_catalogo'],
            where: {
                id_producto,
                id_catalogo
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
    const { id_producto, id_catalogo } = req.params;
    try {
        const numRowDelete = await Inventario.destroy({
            where: {
                id_producto,
                id_catalogo
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
    const { id_product, id_catal } = req.params;
    try {
        const { id_producto, cantidad_en_inventario, id_descuento, id_catalogo } = req.body;
        const comentarioU = await Inventario.update({
            id_producto,
            cantidad_en_inventario,
            id_descuento,
            id_catalogo
        },{
            where: {
                id_producto: id_product,
                id_catalogo: id_catal
            }
        });
        return res.json(comentarioU);
    } catch (e) {
        console.log(e);
        res.status(904).json({
            message: "Algo salio mal 904",
            data: {}
        });
    }
}

export async function updateOnCantidad(req, res) {
    const { id_producto, id_catalogo } = req.params;
    try {
        const { cantidad_en_inventario } = req.body;
        const comentarioU = await Inventario.update({
            cantidad_en_inventario
        },{
            where: {
                id_producto,
                id_catalogo
            }
        });
        return res.json(comentarioU);
    } catch (e) {
        console.log(e);
        res.status(905).json({
            message: "Algo salio mal 905",
            data: {}
        });
    }
}

export async function getOnByProducto(req, res) {
    const { id_producto } = req.params;
    try {
        const comentarios = await Inventario.findAll({
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