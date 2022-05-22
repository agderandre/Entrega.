const {Router} = require('express');
const router = Router();
const Marca = require('../models/Marca')


router.post('/', async function(req, res) {
    
    let marca = new Marca();
    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaCreacion = new Date();
    marca.fechaActualizacion = new Date();

    marca = await marca.save();

     res.send(marca);

})

router.get('/', async function(req, res) {
    try {
        const marca = await Marca.find();
        res.send(marca);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar Marcas');
    }
});


router.put('/:marcaId', async function(req, res) {
    try {

        let marca = await Marca.findById(req.params.marcaId);
        if (!marca){
            return res.send('Usuario no existe');
        }

        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();

        res.send(marca);


    } catch (error) {
        console.log(error);
        res.send('Error: Id invalido');
    }
})

router.delete('/:marcaId', async (req, res) =>{
    try {
        let marcaId = req.params.marcaId;
        await Marca.deleteOne({
            _id: marcaId ||{marcaId,}
            
        })
        res.send("Borrado con exito");
        
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
})

module.exports = router;