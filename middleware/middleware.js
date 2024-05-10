'use strict'

require('dotenv').config();

const { config } = require('dotenv');
var jwt = require ("jsonwebtoken");

var Sessions =require('../models/accessToken'); //

var middleware={

    //validar todo el req
    userprotectURl: function(req, res, next){
        const token = req.headers['x-curso2024-access-token'];

        if(token){
            
            jwt.verify(token,process.env.KEY, (err,decoded) =>{
                if(err){
                    return res.status(401).send({
                        status:401,
                        message:"Token no válido"
                    });
        
                }else{
                    req.decoded=decoded;

                   // console.log(req.decoded.user.email);
                   // console.log(token);

                    //ralizamos un match para buscar usuario (q en el modelo del token el usuario es el correo) y token

                    Sessions.findOne({user:req.decoded.user.email, key: token, active: true})
                    .then(session =>{
                        
                        if(!session){
                            return res.status(401).send({
                                status: 401,
                                message:'Session no encontrada'
                            });
                        }


                        next();
                        
                    })
                    .catch(error =>{
                        return res.status(500).send({
                            status: 500,
                            message:'Error encontrado',
                            
                        });
                    } );

                    
                }
            })

        }else{
            return res.status(401).send({
                status:401,
                message:"No existe el token"
            });

        }

        
    }

};
module.exports = middleware;
