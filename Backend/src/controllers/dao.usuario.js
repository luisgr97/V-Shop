import Usuario from '../models/usuario';

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
        },{
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
        attributes: ['id_usuario','tipo_documento', 'numero_documento', 'nombres', 'apellidos', 'telefono', 'direccion', 'fecha_de_nacimiento', 'correo', 'estado', 'clave', 'nick', 'tipo_usuario']
    });
    res.send(usuario)
}

//get on user
export async function getOneUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
        const usuario = await Usuario.findOne({
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
            fecha_de_nacimiento,
            correo,
            estado,
            clave,
            nick,
            tipo_usuario
        } = req.body;

        const updateUsuario = await Usuario.update({
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
        },{
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

//delete user: set estate to false
export async function deleteUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
        const estado = "0";
        const updateUsuario = await Usuario.update({
            estado
        },{
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
    try {
        const usuario = await Usuario.findOne({
            attributes: ['tipo_usuario'],
            where: {
                nick: nick,
                clave: clave
            }
        });
        if(usuario){
            return res.send(usuario);
        }else{
            return res.json(null);
        }
    } catch (e) {
        console.log(e);
        res.json({
            message:"Error 505",
            data: {}
        });
    }
}

export async function checkNick(req, res) {
    const { nick } = req.params;
    try {
        const usuario = await Usuario.findOne({
            where: {
                nick: nick
            }
        });
        if(usuario){
            return res.send(true);
        }else{
            return res.json(false);
        }
    } catch (e) {
        console.log(e);
        res.json({
            message:"Error 506",
            data: {}
        });
    }
}