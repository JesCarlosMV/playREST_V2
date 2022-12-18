//  ENRUTADOR PARA LA COLECCION JUEGOS
//  Todos los servicios enviaran:
//  200 si todo ha ido bien, 400 si hay un fallo en la petición y 500 si hay un fallo en el servidor

const express = require('express');

let Juego = require(__dirname + '/../models/juego.js');
let router = express.Router();


// devolverá como resultado todo el listado de juegos, si NO hay juegos => status 500 
router.get('/', (req, res) => {

    console.log("entra en el get /")

    Juego.find().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(500)
            .send({ ok: false, error: "No se encontraron juegos de mesa" });
    });
});



// devolverá como resultado  un juego a partir de su id
router.get('/:id', (req, res) => {
    console.log("entra en el get /:id")

    Juego.findById(req.params.id).then(resultado => {
        if (resultado)
            res.status(200)
                .send({ ok: true, resultado: resultado });
        else
            res.status(400)
                .send({
                    ok: false,
                    error: "Juego no encontrado"
                });
    }).catch(error => {
        res.status(500)
            .send({
                ok: false,
                error: "Error buscando el juego indicado"
            });
    });
});


// añadirá el juego que se reciba en la petición a la colección. En dicha petición se
// enviarán los campos básicos del juego (es decir, todo menos el id y el array de las ediciones)
router.post('/', (req, res) => {

    console.log("entrando en post /")

    try {

        let nuevoJuego = new Juego({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            edad: req.body.edad,
            jugadores: req.body.jugadores,
            tipo: req.body.tipo,
            imagen: req.body.imagen,
            precio: req.body.precio
        });
        nuevoJuego.save().then(resultado => {
            res.status(200)
                .send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400)
                .send({
                    ok: false,
                    error: "Error insertando el juego"
                });
        });
    } catch (error) {
        res.status(500)
            .send({
                ok: false,
                error: "Error insertando el juego"
            });
    }
});



//  modificar los datos básicos del juego (todo salvo el id y el array de
//  ediciones). se enviarán en la petición los campos básicos del juego
router.put('/:id', (req, res) => {

    console.log("entra en put /juegos/:id")
    Juego.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            edad: req.body.edad,
            jugadores: req.body.jugadores,
            tipo: req.body.tipo,
            imagen: req.body.imagen,
            precio: req.body.precio
        }
    }, { new: true }).then(resultado => {
        if (resultado)
            res.status(200)
                .send({ ok: true, resultado: resultado });
        else
            res.status(400)
                .send({ ok: false, error: "Error modificando el juego" });
    }).catch(error => {
        res.status(500)
            .send({
                ok: false,
                error: "Error modificando el juego"
            });
    });
});


// modificar el array de ediciones del juego con el id indicado,
// añadiendo la nueva versión del juego que se envíe en la petición
router.post('/ediciones/:idJuego', (req, res) => {

    if (!req.body.edicion || !req.body.anyo) {
        res.status(400).send({ ok: false, error: "Error modificando las ediciones del juego" });
        return false;
    }

    Juego.findByIdAndUpdate(req.params.idJuego, {
        $push: {
            Ediciones: {
                edicion: req.body.edicion,
                anyo: req.body.anyo,
            }
        }
    }, { new: true }).then(resultado => {
        if (resultado)
            res.status(200)
                .send({ ok: true, resultado: resultado });
        else
            res.status(400)
                .send({ ok: false, error: "Error modificando las ediciones del juego" });
    }).catch(error => {
        res.status(500)
            .send({
                ok: false,
                error: "Error modificando las ediciones del juego"
            });
    });

});

// eliminar un juego, junto con sus ediciones, a partir de su id
router.delete('/:id', (req, res) => {
    console.log("entra en delete a /:id")

    Juego.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado)
            res.status(200)
                .send({ ok: true, resultado: resultado });
        else
            res.status(400)
                .send({
                    ok: false,
                    error: "No se ha encontrado el juego para eliminar"
                });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error eliminando libro"
            });
    });
});

// eliminar la edición con el id de
//la edición indicada, para el juego con el id de juego indicado
router.delete('/ediciones/:idJuego/:idEdicion', (req, res) => {



    Juego.findById(req.params.idJuego).then(juego => {


        if (juego) {
            let edicion = juego.Ediciones.find(edicion => edicion._id == req.params.idEdicion);
            juego.Ediciones.remove(edicion);


            juego.save().then(resultado => {
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            })
        }
        else {
            res.status(400)
                .send({
                    ok: false,
                    error: "Error eliminado la edición del juego"
                });
        }
    }).catch(error => {
        res.status(500)
            .send({
                ok: false,
                error: "Error eliminado la edición del juego"
            });
    });
});




module.exports = router;