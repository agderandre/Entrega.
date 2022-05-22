const {Router} = require('express');
const router = Router();
const Usuario = require('../models/Usuario')

router.post('/', async function(req, res) {

    try{
        console.log('Objeto recibido sog', req.body);

        const existeUsuario = await Usuario.findOne({email: req.body.email});
        console.log('Respuesta existe usuario', existeUsuario);
        if (existeUsuario){
            return res.send('Email ya existe');
        }
    
        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);

    } catch(error){
        console.log(error);
        res.send("Ocurrio un error sog");
    }
    
})

router.get('/', async function(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar Usuarios');
    }
});

router.put('/:usuarioId', async function(req, res) {
    try {

        let usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario){
            return res.send('Usuario no existe');
        }

        const existeUsuarioPorSerial = await Usuario
                          .findOne({email: req.body.email});
                          
        if (existeUsuarioPorSerial){
            return res.send('Ya existe otro mail en la base de datos');
        }

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);


    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al modificar inventarios');
    }
})

router.delete('/:usuarioId', async (req, res) =>{
    try {
        let usuarioId = req.params.usuarioId;
        await Usuario.deleteOne({
            _id: usuarioId ||{usuarioId,}
            
        })
        res.send("Borrado con exito");
        
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
})

module.exports = router;