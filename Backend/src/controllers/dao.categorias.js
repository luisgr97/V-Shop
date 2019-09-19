import Categoria from '../models/categoria';
import SubCategoria from '../models/subcategoria';
import Producto from '../models/producto';

//Create category made join
export async function createCategoria(req, res) {
    const { nombre_categoria } = req.body;

    //-------Validacion de las entradas---------------
    //--Variables necesarias
    var go = false; //Variable bandera para determinar si las entradas son correctas, en caso de que todas las entredas sean correctas, go cambiara su valor a true
    var categoriaValidation = { //este objeto contiene los atributos del modelo categoria, si algun atributo no es valido, se cambia su valor a false. Al final, como respuesta se retorna este objeto
        nombre_categoria: true,
    };
    //--Condicionales
    //Evaluamos si los atributos son del tipo esperado o son variables vacias, es caso de cumplirse, se cambia el valor del atributo en el objeto de validaciones a false
    //En caso de pasar por los condicionales de manera satisfactoria, se establese el valor de go a true
    if(typeof(nombre_categoria) != 'string'|| nombre_categoria == ""){
        categoriaValidation.nombre_categoria = false;
    }else{

    }
    try {
        const categoria = await Categoria.create({
            nombre_categoria,
        },{
            fields: ['nombre_categoria']
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
    const { nombre_categoria } = req.body;
    try{
        const updatecategorias = await Categoria.update({
            nombre_categoria,
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

export async function getJoinSubCategoria(req, res){
    try{
        const categoria = await Categoria.findAll({
            include: [{
                model: SubCategoria
            }]
        });
        return res.json(categoria);
    }catch(e){
        console.log(e);
        res.status(408).json({
            message: "error 402 no funca",
            data: {}
        });
    }
}