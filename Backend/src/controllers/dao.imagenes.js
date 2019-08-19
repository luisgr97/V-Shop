import Imagenes from '../models/imagen';

export async function addImagen(req, res) {
    const { id_producto, ruta } = req.body;
    try {
        let imagen = await Imagenes.create({
            id_producto,
            ruta
        },{
            fields: ['id_producto', 'ruta']
        });
        return res.json({
            message: "success adding image",
            data : imagen
        });
    } catch (e) {
        console.log(e);
        res.status(100).json({
            message: "Something goes wrong 100",
            data: {}
        });
    }
}


export async function getImagen(req, res) {
    try{
        const imagenes = await Imagenes.findAll({
            attributes: ['id_imagen','id_producto','ruta']
        });
        return res.json(imagenes);
    }catch(e){
        console.log(e);
        res.status(101).json({
            message: "Something goes wrong 101",
            data: {}
        });
    }
}

export async function getOneImagen(req, res) {
    const { id_imagen } = req.params;
    try{
        const imagen = await Imagenes.findOne({
            attributes: ['id_imagen','id_producto','ruta'],
            where:{
                id_imagen
            }
        });
        return res.json(imagen);
    }catch(e){
        console.log(e);
        res.status(102).json({
            message: "Something goes wrong 102",
            data: {}
        });
    }
}

export async function updateImagen(req, res) {
    const { id_imagen } = req.params;
    try{
        const {id_producto, ruta } = req.body;
        const imagen = await Imagenes.update({
            id_producto,
            ruta
        },{
            where:{
                id_imagen
            }
        });
        return res.json(imagen);
    }catch(e){
        console.log(e);
        res.status(103).json({
            message: "Something goes wrong 103",
            data: {}
        });
    }
}

export async function deleteOnImagen(req, res) {
    const { id_imagen } = req.params;
    try{
        const imagen = await Imagenes.destroy({
            where:{
                id_imagen
            }
        });
        return res.json(imagen);
    }catch(e){
        console.log(e);
        res.status(103).json({
            message: "Something goes wrong 103",
            data: {}
        });
    }
}

export async function getImagesByProducto(req, res) {
    const { id_producto } = req.params;
    try{
        const imagenes = await Imagenes.findAll({
            attributes: ['id_imagen','id_producto','ruta'],
            where: {
                id_producto
            }
        });
        return res.json(imagenes);
    }catch(e){
        console.log(e);
        res.status(104).json({
            message: "Something goes wrong 104",
            data: {}
        });
    }
}