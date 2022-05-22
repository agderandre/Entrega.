const {Router} = require('express');
const router = Router();
const Inventario = require('../models/Inventario');


router.post('/', async function(req, res) {
    try {
        const existeInventarioPorSerial = await Inventario.findOne({serial: req.body.serial});

        if (existeInventarioPorSerial){
            return res.send('Ya existe el serial para otro equipo');
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra  = req.body.fechaCompra;
        inventario.Precio = req.body.Precio;
        inventario.usuario = req.body.usuario._id;  
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();

        res.send(inventario);


    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar inventarios');
    }
})

router.get('/', async function(req, res) {
    try {
        const inventarios = await Inventario.find().populate([
            {
                path: 'usuario', select: 'nombre email estado'
            },
            {
                path: 'marca', select: 'nombre estado'
            },
            {
                path: 'estadoEquipo', select: 'nombre estado'
            },
            {
                path: 'tipoEquipo', select: 'nombre estado'
            },
        ]);
        res.send(inventarios);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar inventarios');
    }
});

router.put('/:inventarioId', async function(req, res) {
    try {

        let inventario = await Inventario.findById(req.params.inventarioId);
        if (!inventario){
            return res.send('Inventario no existe');
        }

        const existeInventarioPorSerial = await Inventario
                          .findOne({serial: req.body.serial, _id:{$ne: inventario.id}});
                          
        if (existeInventarioPorSerial){
            return res.send('Ya existe el serial para otro equipo');
        }

        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra  = req.body.fechaCompra;
        inventario.Precio = req.body.Precio;
        inventario.usuario = req.body.usuario._id;  
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();

        res.send(inventario);


    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar inventarios');
    }
})

router.delete('/:inventarioId', async (req, res) =>{
    try {
        let inventarioId = req.params.inventarioId;
        await Inventario.deleteOne({
            _id: inventarioId ||{inventarioId,}
            
        })
        res.send("Borrado con exito");
        
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
})
module.exports = router;