import Producto from '../models/producto';
//import { on } from 'cluster';
// este es un metodo asincrono ya que toma tiempo para crearse, por ende, en funcion se le indica con "async" y en la constante con await, para esperar a su creacion antes de hacer el send
export async function crearProducto(req, res) {
    //console.log(req.body);
    //aber aber
    const { nombre, imagen_url, empresa_fabricante, descripcion, precio_unitario, descuento, iva, unidades_disponibles, detalles } = req.body;
    try {
        let nuevoProducto = await Producto.create({
            nombre,
            imagen_url,
            empresa_fabricante,
            descripcion,
            precio_unitario,
            descuento,
            iva,
            unidades_disponibles,
            detalles
        }, {
                fields: ['nombre', 'imagen_url', 'empresa_fabricante', 'descripcion', 'precio_unitario', 'descuento', 'iva', 'unidades_disponibles', 'detalles']
            });

        if (nuevoProducto) {
            return res.json({
                message: "El producto se creo correctamente",
                data: nuevoProducto

            });
        }
    } catch (e) {
        //console.log("Imprimiendo nombre: " + nombre);
        console.log(e);
        res.status(500).json({
            message: "error",
            data: {}
        })
    }
}

export async function getProductos(req, res) {
    try {
        const productos = await Producto.findAll();
        return res.json({
            data: productos
        });
    } catch (e) {
        console.log(e);
        res.status(501).json({
            message: 'Algo salio mal 501',
            data: {}
        })
    }
}

export async function getOnProducto(req, res) {
    const { codigo_producto } = req.params;
    try {
        const oneProducto = await Producto.findOne({
            where: {
                codigo_producto
            }
        });
        return res.json({
            data: oneProducto
        });
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 502",
            data: {}
        });
    }
}

export async function deleteOnProducto(req, res) {
    const { codigo_producto } = req.params;
    try {
        const numRowDelete = await Producto.destroy({
            where: {
                codigo_producto
            }
        });
        return res.json({
            message: "Producto eliminado",
            count: numRowDelete
        });
    } catch (e) {
        console.log(e);
        res.status(503).json({
            message: "Algo salio mal 503",
            data: {}
        });
    }
}

export async function updateProductos(req, res) {
    const { codigo_producto } = req.params;
    const { nombre, imagen_url, empresa_fabricante, descripcion, precio_unitario, descuento, iva, unidades_disponibles, detalles } = req.body;
    const productos = await Producto.findAll({
        attributes: ['codigo_producto', 'nombre', 'imagen_url', 'empresa_fabricante', 'descripcion', 'precio_unitario', 'descuento', 'iva', 'unidades_disponibles', 'detalles'],
        where: {
            codigo_producto
        }
    });
    if (productos.length > 0) {
        productos.forEach(async onep => {
            await onep.update({
                nombre,
                imagen_url,
                empresa_fabricante,
                descripcion,
                precio_unitario,
                descuento,
                iva,
                unidades_disponibles,
                detalles
            });
        })
    }

    return res.json({
        message : "Proyecto actualizado con exito",
        data: productos
    })
}