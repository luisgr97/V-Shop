import Usuario from '../models/usuario';
import Factura from '../models/factura';
import Detalle_factura from '../models/detalle_factura';
import Producto from '../models/producto';
import Comentario from '../models/comentario';

//create user
export async function createUsuario(req, res) {
    const {
        //id_usuario, no se incluye el id_usuario, ya que es un autoincrement
        tipo_documento,
        numero_documento,
        nombres,
        apellidos,
        telefono,
        direccion,
        fecha_de_nacimiento,
        correo,
        estado,
        clave,
        nick,
        tipo_usuario
    } = req.body;
    try {
        const usuario = await Usuario.create({
            tipo_documento,
            numero_documento,
            nombres,
            apellidos,
            telefono,
            direccion,
            fecha_de_nacimiento,
            correo,
            estado,
            clave,
            nick,
            tipo_usuario
        }, {
                fields: ['tipo_documento', 'numero_documento', 'nombres', 'apellidos', 'telefono', 'direccion', 'fecha_de_nacimiento', 'correo', 'estado', 'clave', 'nick', 'tipo_usuario']
            });
        return res.json({
            message: "Usuario creado con exito",
            data: usuario
        });
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 500",
            data: {}
        });
    }
}

//get all users
export async function listUsuarios(req, res) {
    const usuario = await Usuario.findAll({
        attributes: ['id_usuario', 'tipo_documento', 'numero_documento', 'nombres', 'apellidos', 'telefono', 'direccion', 'fecha_de_nacimiento', 'correo', 'estado', 'clave', 'nick', 'tipo_usuario']
    });
    res.send(usuario)
}

//get on user
export async function getOneUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
        const usuario = await Usuario.findOne({
            attributes: ['tipo_documento',
                'numero_documento',
                'nombres',
                'apellidos',
                'telefono',
                'direccion',
                'fecha_de_nacimiento',
                'correo',
                'nick'
            ],
            where: {
                id_usuario
            }
        });
        return res.json({
            data: usuario
        });
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 503",
            data: {}
        });
    }
}

//update user
export async function updateUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
        const {
            tipo_documento,
            numero_documento,
            nombres,
            apellidos,
            telefono,
            direccion,
            correo,
            clave
        } = req.body;
    
        //creamos una exp regular para validar el formato de correo.
        var cadena_correo = "^[a-z]+@[a-z]+\.[a-z]{2,4}$"; 
        var exp_reg_correo = new RegExp(cadena_correo);
       
        //creamos una exp regular para validar el formato de texto.
        var cadena_text = "[A-Za-z ñ]+"; 
        var exp_reg_text = new RegExp(cadena_text);
      
        if ((numero_documento.length==10)&&
            (telefono.length==10))
            { if (correo.match(exp_reg_correo)){
                  if ((nombres.match(exp_reg_text))&&
                      (apellidos.match(exp_reg_text))
                     ){
                    if (direccion){
                        if (clave){
                            const updateUsuario = await Usuario.update({
                                tipo_documento,
                                numero_documento,
                                nombres,
                                apellidos,
                                telefono,
                                direccion,
                                correo,
                                clave
                            }, {
                                    where: { id_usuario }
                                });
                            if (updateUsuario) {
                                res.json(updateUsuario);
                            }else {
                                res.json({message: 'El usuario no se pudo actualizar Correctamente.'});
                            }
                        }else {res.json({message: 'El usuario no se pudo actualizar Correctamente, el formato de la clave no es valido'});}
                    }else {res.json({message: 'El usuario no se pudo actualizar Correctamente, el formato de la direccion no es valido'});}
                  }else {res.json({message: 'El usuario no se pudo actualizar Correctamente, los nombres y los apillidos no deben contener números ni caracteres especiales'});} 
              }else {res.json({message: 'El usuario no se pudo actualizar Correctamente, el formato del correo no es valido'});}
            }else {
                res.json({message: 'El usuario no se pudo actualizar Correctamente, el telefono y el documento id deben ser números de 10 digitos'});
            }
            
                    
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 504",
            data: {}
        });
    }
}


//delete user: set estate to false
export async function deleteUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
        const estado = "0";
        const updateUsuario = await Usuario.update({
            estado
        }, {
                where: { id_usuario: id_usuario }
            });
        if (updateUsuario) {
            res.json(updateUsuario);
        }
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 504",
            data: {}
        });
    }
}

//Esta funcion obtiene admin segun clave y nick
export async function logUsuario(req, res) {
    const { nick, clave } = req.body;
    console.log(nick, " ", clave)
    try {
        const usuario = await Usuario.findOne({
            attributes: ['id_usuario', 'nick', 'clave'],
            where: {
                nick: nick
                }
        });
        if (usuario) {
            if (usuario.clave == clave){
                return res.json({
                    find: true,
                    nick: usuario.nick,
                    id_usuario: usuario.id_usuario
                });   
            }else {
               return res.json({
                   find: true,
                   message: 'la contraseña es incorrecta'
               });
            }            
        } else {
            return res.json({ find: false });
        }
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error 505",
            data: {}
        });
    }
}

export async function checkNick(req, res) {
    const { nick } = req.params;
    try {
        const usuario = await Usuario.findOne({
            where: {
                nick
            }
        });
        if (usuario) {
            return res.send(true);
        } else {
            return res.json(false);
        }
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error 506",
            data: {}
        });
    }
}

export async function getJoinFacturas(req, res) {
    const { id_usuario } = req.params;
    try {
        const usuario = await Usuario.findOne({
            attributes: ['tipo_documento',
                'numero_documento',
                'nombres',
                'apellidos',
                'telefono',
                'direccion',
                'fecha_de_nacimiento',
                'correo',
                'nick'
            ],
            include: [{
                model: Factura,
                attributes: ['id_factura', 'fecha', 'total'],
                include: [{
                    model: Detalle_factura,
                    attributes: ['num_detalle', 'cantidad_comprada', 'precio_actual'],
                    include: [{
                        model: Producto,
                        attributes: ['id_producto', 'nombre_producto']
                    }]
                }]
            }],
            where: {
                id_usuario
            }
        });
        return res.json({
            data: usuario
        });
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 503",
            data: {}
        });
    }
}

export async function getJoinComentario(req, res){
    const {id_usuario} = req.params;
    try{
        const user = await Usuario.findAll({
            where: {id_usuario},
            include: [{
                model:  Comentario,
            }]
        });
        return res.json(user);
    }catch(e){
        console.log(e);
        res.status(408).json({
            message: "error 402 no funca",
            data: {}
        });
    }
}