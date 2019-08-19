import Categoria from '../models/categoria';

//Create category
export async function createCategoria(req, res) {
    const { nombre_categoria, linkimagen } = req.body;
    try {
        const categoria = await Categoria.create({
            nombre_categoria,
            linkimagen
        },{
            fields: ['nombre_categoria','linkimagen']
        });
        return res.json({
            message: "Categoria creada con exito",
            data: categoria
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            message: "Ups! algo salio mal 400",
            data: {}
        });
    }
}

//Get all categorys
export async function getCategorias(req, res) {
    try {
        const categorias = await Categoria.findAll();
        return res.json(categorias);
    } catch (e) {
        console.log(e);
        res.status(401).json({
            message: "error 401",
            data: {}
        });
    }
}

//Get on category by id
export async function getOneCategoria(req, res){
    const {id_categoria} = req.params;
    try{
        const categoria = await Categoria.findOne({
            where:{
                id_categoria
            }
        });
        return res.json(categoria);
    }catch(e){
        console.log(e);
        res.status(402).json({
            message: "error 402",
            data: {}
        });
    }
}

//Delete one category
export async function updateCategorias(req, res) {
    const { id_categoria } = req.params;
    const { nombre_categoria, linkimagen } = req.body;
    try{
        const updatecategorias = await Categoria.update({
            nombre_categoria,
            linkimagen
        },{
            where: {
                id_categoria
            }
            
        });
        return res.json(updatecategorias);
    }catch (e){
        console.log(e);
        res.status(402).json({
            message: "error 403",
            data: {}
        });
    }
}

export async function deleteOnCategoria(req, res) {
    const { id_categoria } = req.params;
    try {
        const numRowDelete = await Categoria.destroy({
            where: {
                id_categoria
            }
        });
        return res.json(numRowDelete);
    } catch (e) {
        console.log(e);
        res.status(403).json({
            message: "error 404",
            data: {}
        });
    }
}

