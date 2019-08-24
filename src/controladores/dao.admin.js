import Administrador from '../modelos/administrador'
import Usuario from '../modelos/usuario'

//Esta funcion obtiene admin segun clave y nick
export async function getOneAdmin(req, res) {
    const { nick, clave } = req.body;
    const admin = await Administrador.findOne({
        where: {
            nick: nick,
            clave: clave
        }
    });
    //Si no encontro retorna falso
    if (admin) {
        res.send(admin)
    } else {
        res.send({ encontrado: 'false' })
    }
}

//Sirve para obtener todos los admins
export async function getAdmins(req, res) {
    console.log(req.body)
    const admins = await Administrador.findAll();
    res.send(admins)
}

//Sirve para crear todos los admins
export async function createAdmin(req, res) {
    try {
        const { estado, clave, nick, usuarioid } = req.body;
        const admins = await Administrador.create({ estado, clave, nick, usuarioid });
        if (admins) {
            res.json(admins);
        }
    } catch (e) {
        res.json({ message: 'error', e });
    }
}


//Sirve para actualizar todos los admins
export async function deleteAdmin(req, res) {
    try {
        const { id } = req.body;
        const admins = await Administrador.destroy({ where: { id: id } })
        res.json({ message: 'eliminado' });
    } catch (e) {
        res.json({ message: 'error', e });
    }
}

//Sirve para actualizar todos los admins
export async function updateAdmin(req, res) {
    try {
        const { id, estado, clave, nick } = req.body;
        const admins = await Administrador.findOne({
            attributes: ['estado', 'clave', 'nick'],
            where: { id: id }
        })
        const updateadmins = await Administrador.update({ estado, clave, nick }, {
            where: { id: id }
        });
        if (updateAdmin) {
            res.json(updateAdmin);
        }

    } catch (e) {
        res.json({ message: 'error', e });
    }
}