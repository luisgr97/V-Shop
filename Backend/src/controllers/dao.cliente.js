import Cliente from '../models/cliente';
import Usuario from '../models/usuario';

//Sirve para crear todos los clientes
export async function createCliente(req, res) {
    try {
        const { estado, clave, nick, tarjeta, id_usuario } = req.body;
        const cliente = await Cliente.create({ estado, clave, nick, tarjeta, id_usuario });
        if (cliente) {
            res.json(cliente);
        }
    } catch (e) {
        res.json({ message: 'error', e });
    }
}

//Sirve para actualizar todos los clientes
export async function updateCliente(req, res) {
    try {
        const { id_cliente, estado, clave, nick, tarjeta } = req.body;
        const cliente = await Cliente.findOne({
            attributes: ['estado', 'clave', 'nick', 'tarjeta'],
            where: { id_cliente: id_cliente }
        })
        const updateCliente = await Cliente.update({ estado, clave, nick }, {
            where: { id_cliente: id_cliente }
        });
        if (updateCliente) {
            res.json(updateCliente);
        }

    } catch (e) {
        res.json({ message: 'error', e });
    }
}

//Esta funcion obtiene cliente segun id
export async function getOneCliente(req, res) {
    const { id_cliente } = req.params;
    try {
        const usuario = await Cliente.findOne({
            attributes: ['id_cliente','estado', 'clave', 'nick', 'tarjeta'],
            where: {
                id_cliente
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

//Sirve para obtener todos los clientes
export async function listClientes(req, res) {
    console.log(req.body)
    const cliente = await Cliente.findAll();
    res.send(cliente)
}

//Sirve para eliminar todos los gerentes
export async function deleteCliente(req, res) {
    try {
        const { id_cliente } = req.body;
        const cliente = await Cliente.destroy({ where: { id_cliente: id_cliente } })
        res.json({ message: 'eliminado' });
    } catch (e) {
        res.json({ message: 'error', e });
    }
}

//Esta funcion obtiene admin segun clave y nick
export async function logCliente(req, res) {
    const { nick, clave } = req.body;
    const cliente = await Cliente.findOne({
        attributes: ['nick', 'clave'],
        where: {
            nick: nick,
            clave: clave
        }
    });
    //Si no encontro retorna falso
    if (cliente) {
        res.send(cliente)
    } else {
        res.send({ encontrado: 'false' })
    }
}