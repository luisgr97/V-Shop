import Categoria from '../models/categoria';
import SubCategoria from '../models/subcategoria';

export async function createCategoria(req, res) {
    const { nombre } = req.body;
    //console.log(nombre);
    try {
        let categoria = await Categoria.create({
            nombre
        }, {
                fields: ['nombre']
            });

        return res.json({
            message: "Categoria creada con exito",
            data: categoria
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            message: "Ups! algo salio mal 400",
            data: categoria
        });
    }
}

export async function getCategorias(req, res) {
    try {
        const categorias = await Categoria.findAll();
        return res.json({
            data: categorias
        });
    } catch (e) {
        console.log(e)
        res.status(401).json({
            message: "error 401",
            data: {}
        })
    }
}

export async function getOneCategoria(req,res){
    const {id_categoria} = req.params;
    try{
        const categoria = await Categoria.findOne({
            where:{
                id_categoria
            }
        });
        return res.json({
            data: categoria
        });
    }catch(e){
        console.log(e);
        res.status(402).json({
            message: "error 402",
            data: {}
        });
    }
}

export async function deleteOnCategoria(req, res) {
    const { id_categoria } = req.params;
    try {
        const numRowDeleteSub = await SubCategoria.destroy({
            where:{
                id_categoria
            }
        });
        const numRowDelete = await Categoria.destroy({
            where: {
                id_categoria
            }
        });
        return res.json({
            message: "Categoria eliminada",
            count: numRowDelete
        });
    } catch (e) {
        console.log(e);
        res.status(403).json({
            message: "error 403",
            data: {}
        });
    }
}

export async function updateCategorias(req, res) {
    const { id_categoria } = req.params;
    const { nombre } = req.body;
    const categorias = await Categoria.findAll({
        attributes: ['id_categoria', 'nombre'],
        where: {
            id_categoria
        }
    });
    if (categorias.length > 0) {
        categorias.forEach(async onec => {
            await onec.update({
                nombre
            });
        })
    }

    return res.json({
        message : "Categoria actualizada con exito",
        data: categorias
    })
}