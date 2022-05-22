const {Router} = require('express');
const router = Router();
const TipoEquipo = require('../models/TipoEquipo')


router.post('/', async function(req, res) {
    
    let equipo = new TipoEquipo();
    equipo.nombre = req.body.nombre;
    equipo.estado = req.body.estado;
    equipo.fechaCreacion = new Date();
    equipo.fechaActualizacion = new Date();

    equipo = await equipo.save();

    res.send(equipo);
})

router.get('/', async function(req, res) {
    try {
        const equipo = await TipoEquipo.find();
        res.send(equipo);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar el TipoEquipo');
    }
});

router.put('/:tipoequipoId', async function(req, res) {
    try {

        let tipoequipo = await TipoEquipo.findById(req.params.tipoequipoId);
        if (!tipoequipo){
            return res.send('Estado no existe');
        }

        tipoequipo.nombre = req.body.nombre;
        tipoequipo.estado = req.body.estado;
        tipoequipo.fechaCreacion = new Date();
        tipoequipo.fechaActualizacion = new Date();

        tipoequipo = await tipoequipo.save();

        res.send(tipoequipo);


    } catch (error) {
        console.log(error);
        res.send('Error: Id invalido');
    }
})

router.delete('/:tipoequipoId', async (req, res) =>{
    try {
        let tipoequipoId = req.params.tipoequipoId;
        await TipoEquipo.deleteOne({
            _id: tipoequipoId ||{tipoequipoId,}
            
        })
        res.send("Borrado con exito");
        
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
})

module.exports = router;