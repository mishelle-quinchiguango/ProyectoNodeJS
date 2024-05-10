'use strict'
const mongoose = require('mongoose'); //requiere a mongose
const Schema=mongoose.Schema;

let AccessTokenSchema=Schema({
    //mandamos los parametros del schema
    user:{type: String, require:true, unique: true}, //se toma el tipo y este valor es requerido sino no puede existir, es como decir dato obligatorio
    key:String,
    creationDate: Date,
    expirationDate: String,
    active: Boolean
   
}
);

module.exports=mongoose.model('accessToken',AccessTokenSchema); //mongose lo convierte en modelo pasamos 2 parametros nombre de la tabla y valores

