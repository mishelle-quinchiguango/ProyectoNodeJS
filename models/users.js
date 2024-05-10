'use strict'
const mongoose = require('mongoose'); //requiere a mongose
const Schema=mongoose.Schema;

let UsuariosSchema=Schema({
    //mandamos los parametros del schema
    nombre:{type: String, require:true}, //se toma el tipo y este valor es requerido sino no puede existir, es como decir dato obligatorio
    edad:{type: Number, require:true},
    email:{type: String, require:true},
    password:{type: String, require:true},
    idUser:{type: Number, require:true}
}
);

module.exports=mongoose.model('usuarios',UsuariosSchema); //mongose lo convierte en modelo pasamos 2 parametros nombre de la tabla y valores

