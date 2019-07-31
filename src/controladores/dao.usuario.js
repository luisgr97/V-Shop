import Administrador from '../modelos/administrador'
import Usuario from '../modelos/usuario';

//Sirve para crear todos los usuarios
export async function createUsuario(req, res) {
    try {
        const {
            id,
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
        const usuario = await Usuario.create({
            id,
            documento,
            numero,
            nombres,
            apellidos,
            telefono,
            direccion,
            cumpleanos,
            nacimiento,
            correo
        });
        if (usuario) {
            res.json(usuario);
        }
    } catch (e) {
        res.json({ message: 'error' });
    }
}

//Sirve para borras  los usuarios
export async function deleteUsuario(req, res) {
    try {
        const { id } = req.body;
        const usuario = await Usuario.destroy({ where: { id: id } })
        res.json({ message: 'eliminado' });
    } catch (e) {
        res.json({ message: 'error', e });
    }
}

//Esta funcion obtiene admin segun id
export async function getOneUsuario(req, res) {
    const { id } = req.body;
    const usuario = await Usuario.findOne({
        attributes: ['documento', 'numero', 'nombres', 'apellidos', 'telefono', 'direccion', 'cumpleanos', 'nacimiento', 'correo'],
        where: {
            id: id
        }
    });
    //Si no encontro retorna falso
    if (usuario) {
        res.json(usuario);
    } else {
        res.send({ encontrado: 'false' })
    }
}

export async function updateUsuario(req, res) {
    try {
        const {
            id,
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
            where: { id: id }
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
            where: { id: id }
        });
        if (updateUsuario) {
            res.json(updateUsuario);
        }

    } catch (e) {
        res.json({ message: 'error', e });
    }
}

//Sirve para obtener todos los admins
export async function listUsuarios(req, res) {
    const usuario = await Usuario.findAll({
        attributes: ['documento', 'numero', 'nombres', 'apellidos', 'telefono', 'direccion', 'cumpleanos', 'nacimiento', 'correo']
    });
    res.send(usuario)
}