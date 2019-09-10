import Producto from '../models/producto';
import Imagenes from '../models/imagen'

// este es un metodo asincrono ya que toma tiempo para crearse, por ende, en funcion se le indica con "async" y en la constante con await, para esperar a su creacion antes de hacer el send
export async function crearProducto(req, res) {
    const { nombre_producto, descripcion, marca, precio, id_subcategoria } = req.body;
    console.log(req.body)

    var failure = false;
    var productoObject = {
        nombre_producto: true,
        descripcion: true,
        marca: true,
        precio: true,
        id_subcategoria: true
    };

    if(typeof(parseInt(precio)) != 'number'){
        productoObject.precio = false;
        failure = true;
    }
    if(typeof(nombre_producto) != 'string' || nombre_producto == ""){
        productoObject.nombre_producto = false;
        failure = true;
    }
    if(typeof(descripcion) != 'string' || descripcion == ""){
        productoObject.descripcion = false;
        failure = true;
    }
    if(typeof(marca) != 'string' || marca == ""){
        console.log("Esta vacio")
    }
    if(typeof(marca) != 'string' || marca == ""){
        productoObject.marca = false;
        failure = true;
    }
    if(typeof(parseInt(id_subcategoria)) != 'number'){
        productoObject.id_subcategoria = false;
        failure = true;
    }
    if(failure){
        return res.json({
            exito: failure,
            data : productoObject
        });
    }

    try {
        let nuevoProducto = await Producto.create({
            nombre_producto,
            descripcion,
            marca, precio,
            id_subcategoria
        },{
            fields: ['nombre_producto', 'descripcion', 'marca', 'precio', 'id_subcategoria']
        });
        return res.json({
            message: "Producto creado con exito",
            exito  : true,
            id_producto: nuevoProducto.id_producto
        })
    } catch (e) {
        console.log(e);
        res.status(200).json({
            message: "Something goes wrong 200",
            error: true,
        });
    }
}

export async function getProductos(req, res) {
    try {
        const productos = await Producto.findAll({
            include: [{
                model: Imagenes,
                attributes: ['id_imagen','ruta']
            }]
            //attributes: ['id_producto','nombre_producto', 'descripcion', 'marca', 'precio', 'id_subcategoria']
        });
        return res.json(productos);
    } catch (e) {
        console.log(e);
        res.status(201).json({
            message: 'Algo salio mal 201',
            data: {}
        });
    }
}

export async function getOnProducto(req, res) {
    const { id_producto } = req.params;
    try {
        const oneProducto = await Producto.findOne({
            attributes: ['id_producto','nombre_producto', 'descripcion', 'marca', 'precio', 'id_subcategoria'],
            where: {
                id_producto
            }
        });
        return res.json(oneProducto);
    } catch (e) {
        console.log(e);
        res.status(202).json({
            message: "Algo salio mal 202",
            data: {}
        });
    }
}

export async function deleteOnProducto(req, res) {
    const { id_producto } = req.params;
    try {
        const numRowDelete = await Producto.destroy({
            where: {
                id_producto
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

export async function updateProductos(req, res) {
    const { id_producto } = req.params;
    try {
        const { nombre_producto, descripcion, marca, precio, id_subcategoria } = req.body;
        const productos = await Producto.update({
            nombre_producto,
            descripcion,
            marca, precio,
            id_subcategoria
        },{
            where: {
                id_producto
            }
        });
        return res.json(productos);
    } catch (e) {
        console.log(e);
        res.status(204).json({
            message: "Algo salio mal 204",
            error: true
        });
    }
}

export async function getOnProductoBySubcategoria(req, res) {
    const { id_subcategoria } = req.params;
    try {
        const productos = await Producto.findAll({
            attributes: ['id_producto','nombre_producto', 'descripcion', 'marca', 'precio', 'id_subcategoria'],
            where: {
                id_subcategoria
            }
        });
        return res.json(productos);
    } catch (e) {
        console.log(e);
        res.status(202).json({
            message: "Algo salio mal 202",
            data: {}
        });
    }
}

//filtra producto por sus caracteristicas.
export async function buscarProducto(req, res) {
    const tags  = req.body;
    try {
        const productos = await Producto.findAll({
            fields: ['nombre_producto', 'descripcion', 'marca', 'precio', 'id_subcategoria'],
            where: tags//filtra por los parametros recibidos
        });
        return res.json(productos);
    } catch (e) {
        console.log(e);
        res.status(200).json({
            message: "Something goes wrong 200",
            error: true,
        });
    }
}