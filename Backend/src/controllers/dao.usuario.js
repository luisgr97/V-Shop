import Administrador from '../models/administrador';
import Cliente from '../models/cliente';
import Gerente from '../models/gerente';
import Usuario from '../models/usuario';
//Sirve para crear todos los usuarios
export async function createUsuario(req, res) {
    const {
        documento,
        numero,
        nombres,
        apellidos,
        telefono,
        direccion,
        cumpleanos,
        nacimiento,
        correo
    } = req.body;
    try {
        const usuario = await Usuario.create({
            documento,
            numero,
            nombres,
            apellidos,
            telefono,
            direccion,
            cumpleanos,
            nacimiento,
            correo
        },{
            fields: ['documento', 'numero', 'nombres', 'apellidos', 'telefono', 'direccion', 'cumpleanos', 'nacimiento', 'correo']
        });
        return res.json({
            message: "Usuario creado con exito",
            data: usuario
        });
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 502",
            data: {}
        });
    }
}
//Sirve para borras  los usuarios
export async function deleteUsuario(req, res) {
    const { id_usuario } = req.params;
    let estado = false;
    try {
        const administradores = await Administrador.findAll({
            attributes: ['estado'],
            where:{
                id_usuario
            }
        });
        if (administradores.length > 0) {
            administradores.forEach(async onep => {
                await onep.update({
                    estado
                });
            })
        }

        const clientes = await Cliente.findAll({
            attributes: ['estado'],
            where:{
                id_usuario
            }
        });
        if (clientes.length > 0) {
            clientes.forEach(async onep => {
                await onep.update({
                    estado
                });
            })
        }
        const gerentes = await Gerente.findAll({
            attributes: ['estado'],
            where:{
                id_usuario
            }
        });
        if (gerentes.length > 0) {
            gerentes.forEach(async onep => {
                await onep.update({
                    estado
                });
            })
        }
        return res.json({
            message: "Usuario eliminad0"
        });
    } catch (e) {
        console.log(e);
        res.status(403).json({
            message: "error 403",
            data: {}
        });
    }
}

//Esta funcion obtiene admin segun id
export async function getOneUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
        const usuario = await Usuario.findOne({
            attributes: ['id_usuario', 'documento', 'numero', 'nombres', 'apellidos', 'telefono', 'direccion', 'cumpleanos', 'nacimiento', 'correo'],
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
            message: "Algo salio mal 502",
            data: {}
        });
    }
}

export async function updateUsuario(req, res) {
    try {
        const {
            id_usuario,
            documento,
            numero,
            nombres,
            apellidos,
            telefono,
            direccion,
            cumpleanos,
            nacimiento,
            correo
        } = req.body;
        const usuario = await Usuario.findOne({
            attributes: ['documento', 'numero', 'nombres', 'apellidos', 'telefono', 'direccion', 'cumpleanos', 'nacimiento', 'correo'],
            where: { id_usuario: id_usuario }
        })
        const updateUsuario = await Usuario.update({
            documento,
            numero,
            nombres,
            apellidos,
            telefono,
            direccion,
            cumpleanos,
            nacimiento,
            correo
        }, {
            where: { id_usuario: id_usuario }
        });
        if (updateUsuario) {
            res.json(updateUsuario);
        }

    } catch (e) {
        res.json({ message: 'error', e });
        console.log(e);
    }
}

//Sirve para obtener todos los admins
export async function listUsuarios(req, res) {
    const usuario = await Usuario.findAll({
        attributes: ['documento', 'numero', 'nombres', 'apellidos', 'telefono', 'direccion', 'cumpleanos', 'nacimiento', 'correo']
    });
    res.send(usuario)
}

//Esta funcion obtiene admin segun clave y nick
export async function logUsuario(req, res) {
    const { nick, clave } = req.body;
    const usuario = await Usuario.findOne({
        attributes : ['nick', 'clave'],
        where: {
            nick: nick,
            clave: clave
        }
    });
    //Si no encontro retorna falso
    if (usuario) {
        res.send(usuario)
    } else {
        res.send({ encontrado: 'false' })
    }
}