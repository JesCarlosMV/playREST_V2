//SERVIDOR PRINCIPAL

// Librerias
const express = require('express');
const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/juegos';



// enrutadores
const juego = require(__dirname + "/routes/juegos");



//conexion a la base de datos + evento de conexion en consola
mongoose.connect(URI);
mongoose.connection.on("connected", () => {
    console.log("conectado a la base de datos en : " + URI)
});

// Server Express
let app = express();


// Middlewares
app.use(express.json());
app.use('/juegos', juego);



// Puesta en marcha del servidor
app.listen(8080, (req, res) => { console.log('Servidor en marcha'); });




// // para poder crear juegos para trastear al principio
// const Juego = require('./models/juego');
// //AÑADIMOS UN PAR DE JUEGOS PARA TRASTEAR
// const juego1 = new Juego({
//     nombre: "fortnite",
//     descripcion: "Juego de disparos",
//     edad: 12,
//     jugadores: 1,
//     tipo: "disparos",
//     precio: 0.00,
//     imagen: "fortnite.jpg",
//     Ediciones: [{
//         edicion: "primeraedicion",
//         anyo: 2020
//     }]
// });
// const juego2 = new Juego({
//     nombre: "Lineage II",
//     descripcion: "Juego de rol",
//     edad: 18,
//     jugadores: 1,
//     tipo: "rol",
//     precio: 19.99,
//     imagen: "imagenLinageII.jpg",
//     Ediciones: [{
//         edicion: "The Gattering",
//         anyo: 2004
//     }]
// });

// juego2.save().then(resultado => {
//     console.log(resultado);
// }).catch(error => {
//     console.log(error);
// });

// juego1.save().then(resultado => {
//     console.log(resultado);
// }).catch(error => {
//     console.log(error);
// }); 