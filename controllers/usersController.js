'use strict'

const {validationResult}= require('express-validator')
const { urlencoded } = require("body-parser");
var Usuarios = require('../models/users');

var controller = {
  
    listUsuarios:function(req, res){
        Usuarios.find({})
        .then(usuarios =>{
            
            return res.status(200).json({
                status: 200,
                message:'Usuarios listados',
                data: usuarios
            });
            
        })
        .catch(error =>{
            return res.status(500).json({
                status: 500,
                message:'Error encontrado',
                
            });
        } );
        
        //return res.send("hola mundo ")
    },

    userSingular:function(req, res){
        var params=req.params;
        var iduser=parseInt(params.id);

        Usuarios.findOne({idUser:iduser})
        .then(usuarios =>{
            console.log(usuarios);
            return res.status(200).send({
                status: 200,
                message:'Información del usuario',
                data: usuarios
            });
            
        })
        .catch(error =>{
            return res.status(500).send({
                status: 500,
                message:'Error encontrado',
                
            });
        } );
        
        //return res.send("hola mundo ")
    },


    crear_usuario:function(req, res){

        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).send({
                status:400,
                errors:errors.array()
            })
        }

        var user_info=req.body;

          //varilidar si existe el usuario
          Usuarios.findOne({idUser:user_info.idUser})
          .then(usuarios =>{
              if(usuarios){
                return res.status(400).json({
                    status: 400,
                    message:'Usuario existente'
                });
            }
              



            var create_user=new Usuarios(); 

            create_user.nombre=user_info.nombre;
            create_user.edad=user_info.edad;
            create_user.email=user_info.email;
            create_user.password=user_info.password;
            create_user.idUser=user_info.idUser;

            create_user.save()
            .then((result) =>{
                return res.status(200).json({
                    status: 200,
                    message:'Usuario almacenado',
                    data: result
                });
            })
            .catch(error =>{
                return res.status(500).json({
                    status: 500,
                    message:'Error encontrado',
                    
                });
            } );
            
              
          })
          .catch(error =>{
              return res.status(500).json({
                  status: 500,
                  message:'Error encontrado',
                  
              });
          } );

        


    },

    updateUser: function(req, res) {

        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).send({
                status:400,
                errors:errors.array()
            })
        }

        var params=req.params;
        var iduser=parseInt(params.id);
        
        var user_info=req.body;
        var userUpdate={
            nombre:user_info.nombre,
            edad:user_info.edad,
            email:user_info.email,
            password:user_info.password,
            idUser:user_info.idUser
        }
        
        Usuarios.findOneAndUpdate({idUser:iduser},userUpdate)
        .then(usuarios =>{

            if(!usuarios){
                return res.status(200).json({
                    status: 200,
                    message:'Usuario no encontrado'
                });
            }
            console.log(usuarios);
            return res.status(200).json({
                status: 200,
                message:'Usuario actualizado'
            });
            
        })
        .catch(error =>{
            console.log(error)
            return res.status(500).json({
                status: 500,
                message:'Error encontrado',
                
            });
        } );
        
    },

    deleteUser: function(req, res) {

        var params=req.params;
        var iduser=parseInt(params.id);

        Usuarios.findOneAndDelete({idUser:iduser})
        .then(usuarios =>{

            if(!usuarios){
                return res.status(200).json({
                    status: 200,
                    message:'Usuario no encontrado'
                });
            }

            console.log(usuarios);
            return res.status(200).json({
                status: 200,
                message:'Usuario eliminado'
            });
            
        })
        .catch(error =>{
            console.log(error)
            return res.status(500).json({
                status: 500,
                message:'Error encontrado',
                
            });
        } );
    }


    
}

// Exportar el controller completo

module.exports = controller;