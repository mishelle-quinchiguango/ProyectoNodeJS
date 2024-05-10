'use strict'

const express=require('express');
const app=express();

var bodyParser=require('body-parser');
var routes=require('./routers/api');

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json({
    parameterLimit:10000,
    limit:'50mb',
    extended:false
}));

//errores de JSON controlado mediante middware
app.use((err, req, res, next)=>{

    if(err instanceof SyntaxError && err.status ===400 &&  'body'in err){
        return res.status(400).send({
            status: 400,
            message: err.message
        });

    }
    
    next();

});


app.use('',routes); //hacemos uso de app y routes

module.exports=app; //exportamos la app