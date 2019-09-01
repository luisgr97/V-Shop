import Producto from '../models/producto';

// este es un metodo asincrono ya que toma tiempo para crearse, por ende, en funcion se le indica con "async" y en la constante con await, para esperar a su creacion antes de hacer el send
export async function crearProducto(req, res) {
    const { nombre_producto, descripcion, marca, precio, id_subcategoria } = req.body;

    var go = false;
    var productoObject = {
        nombre_producto: true,
        descripcion: true,
        marca: true,
        precio: true,
        id_subcategoria: true
    };

    if(typeof(precio) != 'number'){
        productoObject.precio = false;
    }else if(typeof(nombre_producto) != 'string' || nombre_producto === ""){
        productoObject.nombre_producto = "Ingrese un nombre de producto valido"
    }else if(typeof(descripcion) != 'string'){
        productoObject.descripcion = "Ingrese una descripcion valida"
    }else if(typeof(marca) != 'string'){
        productoObject.marca = "Ingrese una marca valida"
    }else if(typeof(id_subcategoria) != 'number'){
        productoObject.marca = "Escoga una subcategoria valida"
    }else{
        go = true;
    }
    if(!go){
        return res.json({
            message: "Validacion Fallida",
            exito : go
        })
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
            exito  : go
        })
    } catch (e) {
        console.log(e);
        res.status(200).json({
            message: "Something goes wrong 200",
            data: {}
        });
    }
}

export async function getProductos(req, res) {
    try {
        const productos = await Producto.findAll({
            attributes: ['id_producto','nombre_producto', 'descripcion', 'marca', 'precio', 'id_subcategoria']
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
            data: {}
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