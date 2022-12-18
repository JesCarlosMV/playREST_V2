// ESQUEMAS Y MODELOS DE LA APLICACION

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Esquema edicion , al ser local(dentro de este mismo archivo) NO se exporta
const edicionSchema = new Schema({
    edicion: {
        type: String,
        required: true
    },
    anyo: {
        type: Number,
        min: 2000,
        max: 2022,
    }
});


// Esquema juego
const juegoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        minLength: 6
    },
    descripcion: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    jugadores: {
        type: Number,
        required: true
    },
    tipo: {
        enum: ["rol", "escape", "dados", "fichas", "cartas", "tabledro"]
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    imagen: {
        type: String,
    },
    Ediciones: [edicionSchema]
});


// MODELO Juego y lo exportamos (coleccion juegoS) ojo con la S en BBDD
let Juego = mongoose.model('juego', juegoSchema);

module.exports = Juego;