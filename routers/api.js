'use strict'

const express=require('express');
const {body} = require('express-validator');
const api=express.Router();

var middleware=require("../middleware/middleware.js");

var UsuariosController = require('../controllers/usersController.js');

var AuthController = require('../controllers/auth.js');

//estos son endPoints
/*api.get('/',(req,res)=>{
    res.send("hello word");
    console.log(req.body);

})*/

//login
api.post('/login/', [
    body("email").not().isEmpty(),
    body("password").not().isEmpty()
], AuthController.login_user );

//logout
api.post('/logout',middleware.userprotectURl,AuthController.logout);

//este get utilizando el controller
api.get('/users/', middleware.userprotectURl, UsuariosController.listUsuarios);

api.get('/user/:id',middleware.userprotectURl,UsuariosController.userSingular);

api.post('/user', middleware.userprotectURl,[
    body("idUser").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty()
],UsuariosController.crear_usuario);

// Ruta para actualizar 
api.put('/user/:id' , middleware.userprotectURl,[
    body("idUser").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty()

] , UsuariosController.updateUser);

// Ruta para eliminar 
api.delete('/user/:id', middleware.userprotectURl, UsuariosController.deleteUser);


module.exports=api; //exportamos la app