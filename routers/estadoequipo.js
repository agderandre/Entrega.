const {Router} = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const router = Router();


router.post('/', async function(req, res) {
    let estado = new EstadoEquipo();
        estado.nombre = req.body.nombre;
        estado.estado = req.body.estado;
        estado.fechaCreacion = new Date();
        estado.fechaActualizacion = new Date();

        estado = await estado.save();

        res.send(estado);
})

router.get('/', async function(req, res) {
    try {
        const estadoequipo = await EstadoEquipo.find();
        res.send(estadoequipo);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar EstadoEquipo');
    }
})

router.put('/:tipoequipoId', async function(req, res) {
    try {

        let estadoequipo = await EstadoEquipo.findById(req.params.estadoequipoId);
        if (!estadoequipo){
            return res.send('Estado no existe');
        }

        estadoequipo.nombre = req.body.nombre;
        estadoequipo.estado = req.body.estado;
        estadoequipo.fechaCreacion = new Date();
        estadoequipo.fechaActualizacion = new Date();

        estadoequipo = await estadoequipo.save();

        res.send(estadoequipo);


    } catch (error) {
        console.log(error);
        res.send('Error: Id invalido');
    }
})

router.delete('/:estadoequipoId', async (req, res) =>{
    try {
        let estadoquipoId = req.params.estadoequipoId;
        await EstadoEquipo.deleteOne({
            _id: estadoquipoId ||{estadoquipoId,}
            
        })
        res.send("Borrado con exito");
        
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
})

module.exports = router;