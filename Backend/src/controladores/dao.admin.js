import Administrador from '../modelos/administrador'
import Usuario from '../modelos/usuario'

//Esta funcion obtiene admin segun clave y nick
export async function getOneAdmin(req, res){
    const {nick, password} = req.body;
    const admin = await Administrador.findOne(
        {
            where: {
                nick: nick,
                clave: password
            }        
        }
    );
    //Si no encontro retorna falso
    if(admin){ 
        res.send(admin)
    }else{
        res.send({encontrado: 'false'})
    }    
}

//Sirve para obtener todos los admins
export async function getAdmins(req, res){
    console.log(req.body)
    const admins = await Administrador.findAll();
    res.send(admins)
}