'use strict'

const mongoose = require('mongoose'); //requiere a mongose
var app = require('./app'); //requiere a app.js
var port = 3000;

mongoose.Promise = global.Promise; //promesa coloca al servidor un punto de observacion y espera algun cambio 
mongoose.connect("mongodb+srv://mishellequinchiguango:SistemasMQ@cluster0.1m2nvzn.mongodb.net/CursoNodeJS", 
{useNewUrlParser: true, useUnifiedTopology: true}) //le decimos como va a parsear la URL 
        .then(() => {  //si logra conectarse haer esto o sino el otro (como un true y catch)
            console.log(" Conexión a la base de datos establecida con éxito");

            var server = app.listen(port, () => { //declarar el servidor
                console.log(`servidor ejecutanto en ${port}`)
            });

            server.timeout = 120000; //si sucede algún error cierre el servidor despues de 12000sg

            
        })
        .catch(err => console.log(err)); //obtner los errores

