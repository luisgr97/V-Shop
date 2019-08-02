import Administrador from '../models/administrador';
import Usuario from '../models/usuario';


//Esta funcion obtiene Admin segun id
export async function getOneAdmin(req, res) {
    const { id_adm } = req.params;
    try {
        const usuario = await Administrador.findOne({
            attributes: ['id_adm','estado', 'clave', 'nick', 'id_usuario'],
            where: {
                id_adm
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


//Esta funcion obtiene admin segun clave y nick
export async function logAdmin(req, res) {
    const { nick, clave } = req.body;
    try {
        const admin = await Administrador.findOne({
            attributes: ['id_adm', 'estado', 'clave', 'nick', 'id_usuario'],
            where: {
                nick: nick,
                clave: clave
            }
        });
        if(admin){
            return res.send(true);
        }else{
            return res.send(false);
        }
    } catch (e) {
        console.log(e);
        res.json({
            message:"Error 201",
            data: {}
        });
    }
}

//Sirve para obtener todos los admins
export async function getAdmins(req, res) {
    console.log(req.body)
    const admins = await Administrador.findAll({
        attributes: ['id_usuario','nick', 'clave', 'estado']
    });
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