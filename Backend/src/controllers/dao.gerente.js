import Gerente from '../models/gerente';
import Usuario from '../models/usuario';

//Sirve para crear todos los gerentes
export async function createGerente(req, res) {
    try {
        const { estado, clave, nick, id_usuario } = req.body;
        const gerente = await Gerente.create({ id_usuario, estado, clave, nick });
        if (gerente) {
            res.json(grente);
        }
    } catch (e) {
        res.json({ message: 'error', e });
    }
}

//Sirve para actualizar todos los gerentes
export async function updateGerente(req, res) {
    try {
        const { id_gerente, estado, clave, nick } = req.body;
        const gerente = await Gerente.findOne({
            attributes: ['estado', 'clave', 'nick'],
            where: { id_gerente: id_gerente }
        })
        const updateGerente = await Gerente.update({ estado, clave, nick }, {
            where: { id_gerente: id_gerente }
        });
        if (updateGerente) {
            res.json(updateGerente);
        }

    } catch (e) {
        res.json({ message: 'error', e });
    }
}

//Sirve para eliminar todos los gerentes
export async function deleteGerente(req, res) {
    try {
        const { id_gerente } = req.body;
        const gerente = await Gerente.destroy({ where: { id_gerente: id_gerente } })
        res.json({ message: 'eliminado' });
    } catch (e) {
        res.json({ message: 'error', e });
    }
}

//Esta funcion obtiene genrente segun id
export async function getOneGerente(req, res) {
    const { id_gerente } = req.body;
    const genrente = await Gerente.findOne({
        where: {
            id_gerente: id_gerente
        }
    });
    //Si no encontro retorna falso
    if (genrente) {
        res.send(genrente)
    } else {
        res.send({ encontrado: 'false' })
    }
}

//Sirve para obtener todos los admins
export async function listGerentes(req, res) {
    console.log(req.body)
    const gerente = await Gerente.findAll();
    res.send(gerente)
}

//Esta funcion obtiene admin segun clave y nick
export async function logGerente(req, res) {
    const { nick, clave } = req.body;
    const gerente = await Gerente.findOne({
        where: {
            nick: nick,
            clave: clave
        }
    });
    //Si no encontro retorna falso
    if (gerente) {
        res.send(gerente)
    } else {
        res.send({ encontrado: 'false' })
    }
}