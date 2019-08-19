import SubCategoria from '../models/subcategoria';
import Categoria from '../models/categoria';

export async function createSubCategoria(req, res) {
    const { nombre_subcategoria, linkimagen, id_categoria } = req.body;
    try {
        const subcategoria = await SubCategoria.create({
            nombre_subcategoria,
            linkimagen,
            id_categoria
        },{
            fields: ['nombre_subcategoria', 'linkimagen','id_categoria']
        });

        return res.json({
            message: "SubCategoria creada con exito",
            data: subcategoria
        });
    } catch (e) {
        console.log(e);
        res.status(300).json({
            message: "Ups! algo salio mal 300",
            data: subcategoria
        });
    }
}

export async function getSubCategorias(req, res) {
    try {
        const subcategorias = await SubCategoria.findAll({
            attributes: ['id_subcategoria', 'nombre_subcategoria', 'linkimagen','id_categoria']
        });
        return res.json(subcategorias);
    } catch (e) {
        console.log(e)
        res.status(301).json({
            message: "error 301",
            data: {}
        })
    }
}

export async function getOneSubCategoria(req, res) {
    const { id_subcategoria } = req.params;
    try {
        const subcategoria = await SubCategoria.findOne({
            attributes: ['id_subcategoria', 'nombre_subcategoria', 'linkimagen','id_categoria'],
            where: {
                id_subcategoria
            }
        });
        return res.json(subcategoria);
    } catch (e) {
        console.log(e);
        res.status(302).json({
            message: "error 302",
            data: {}
        });
    }
}

export async function getSubCategoriasByCategoria(req, res) {
    const { id_categoria } = req.params;
    console.log(id_categoria);
    try {
        const subcategorias = await SubCategoria.findAll({
            attributes: ['id_subcategoria', 'nombre_subcategoria', 'linkimagen','id_categoria'],
            where: {
                id_categoria
            }
        });
        return res.json(subcategorias);
    } catch (e) {
        console.log(e);
        res.status(301).json({
            message: "error 304",
            data: {}
        });
    }
}

export async function updateSubCategorias(req, res) {
    const { id_subcategoria } = req.params;
    const { nombre_subcategoria, linkimagen, id_categoria } = req.body;
    try{
        const subcategorias = await SubCategoria.update({
            nombre_subcategoria,
            linkimagen,
            id_categoria
        },{
            where: {
                id_subcategoria
            }
        });
        return res.json(subcategorias);
    }catch (e){
        console.log(e);
        res.status(301).json({
            message: "error 305",
            data: {}
        });
    }
}

export async function deleteOnSubCategoria(req, res) {
    const { id_subcategoria } = req.params;
    try {
        const numRowDelete = await SubCategoria.destroy({
            where: {
                id_subcategoria
            }
        });
        return res.json(numRowDelete);
    } catch (e) {
        console.log(e);
        res.status(303).json({
            message: "error 304",
            data: {}
        });
    }
}

export async function getSubCategoriasPorCategoria(req, res) {
    try {
        const categorias = await Categoria.findAll();

        const subcategorias = await SubCategoria.findAll({
            attributes: ['id_subcategoria', 'nombre']
        });

        

        let donh = [{
            'ome': 'Lady'
        },{
            'ome':'Carlos'
        }];
        donh.push({'ome':'Julian'});
        console.log(donh);
        categorias.forEach(async cate => {
            var id_categoria = cate.dataValues['id_categoria'];
            console.log(id_categoria);
            const subcategorias = await SubCategoria.findAll({
                attributes: ['id_subcategoria', 'nombre'],
                where: {
                    id_categoria
                }
            });
        });
        /*
        const subcategorias = await SubCategoria.findAll({
            attributes: ['id_subcategoria', 'nombre'],
            where: {
                id_categoria
            }
        });
        let donh = {
            'ome': 'Lady'
        };
        let nino = [{
            'perrito': 'carlos'
        }, {
            'perrito': 'mateo'
        }];
        donh.mas = nino;
        console.log(donh);
        categorias.forEach(papu => {
            console.log(papu.dataValues['id_categoria']);
        });
        */
        return res.json({
            data: categorias
        });
    } catch (e) {
        console.log(e)
        res.status(301).json({
            message: "error 301",
            data: {}
        })
    }
}