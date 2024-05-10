'use strict'

require('dotenv').config();

var jwt = require ("jsonwebtoken")
const {validationResult}= require('express-validator');
var Usuarios = require('../models/users');

var Sessions =require('../models/accessToken');

var controller = {

    login_user: function (req, res){

        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).send({
                status:400,
                errors:errors.array()
            })
        }

        var data=req.body;

        Usuarios.findOne({email:data.email})
        .then(usuarios =>{
            
               if(data.password == usuarios.password){

                //const private_key = "MIICXAIBAAKBgQCIWmdU5UESDjsinbl1W04lnopm9gRopxZoOhUEg2gFywh0ZuyxIEyN8jlE50n1ImA52JrdhONVO+DePMUqVcN2OKWAL5d/D+g9eFVdjZdY/gpxw1Z00yVJb/hXX6S5G3TZeKIx+PYvdVN/KEpedDsi8+Oz984yDwlr5JIV7iAWxwIDAQABAoGARu0Plv9xa5zvccAtejg2XCctwwTxoiZX53te92wLLghAq5vmPvSYHbYDyC2vMM3i0/QyCkxXnDx7ad6eiLj35MI7jJD1NFYTj+BP1+DbTTOVzbqP0mmDM4lVd0x09GnX9B7XE3Myn8bfOpz43FWmflfBq3oI8wZ5IynW7ZJJz1ECQQDGBchubl4b7CA1Y9zSqwdqML/iwha96osZYGqfDknqtgxBNGzdb/qRh+yM2GB3HHSIsPC16FYR7p/SplvCsMELAkEAsEZdBUJCy+J6I+5cyMbgLUrp6SD3/QGxdoBewzqlcsQxmRa7dpWULLCxQnYVIRlsuTUNJ0fpLgVDNXw652sOtQJAV6hpsFDVAgFFxLyfHPauwpgv6R5H2OxBhQtER4KYv/i0dgzSADg4sEF+Ol7yXOfQwk2pUK03pJqAT0xrJEUAPwJBAJHOUekkqt28gq0v3/2PSyULvzm/tIDJosHTYw73dpzcne30OLHY/gyNRsIjrEyJnD4CHNQuDjmrzrDyBkMfcbUCQEla4ZDWxE7fhGO9cAQQMdQm89TNaqrzhTLARWqDMWTy0IrbI9uDfbbhAd7Po7mNCIlb3cK6pCUezuoc8jivR0Q="

                const payload = {
                    user:usuarios
                }

                let access_token=jwt.sign(payload, process.env.KEY, {
                    expiresIn:'1d' //dura un día
                });

                let today = new Date().toISOString();

                let update_session = {

                    user:usuarios.email,
                    key:access_token,
                    creationDate: today,
                    expirationDate: '1d',
                    active: true


                }

                Sessions.findOneAndUpdate({user:usuarios.email},update_session, {upsert: true, new:true})
                .then(session =>{

                    if(!session){
                        return res.status(401).send({
                            status: 401,
                            message:'Usuario no encontrado'
                        });
                    }
                    return res.status(200).send({
                        status: 200,
                        message:'Login correcto',
                        token:access_token
                    });
    
                    
                })
                .catch(error =>{
                    console.log(error)
                    return res.status(500).json({
                        status: 500,
                        message:'Error encontrado',
                        
                    });
                } );

                
            }else{
                return res.status(400).send({
                    status: 400,
                    message:'Datos no validos',
                    
                });

            }
           
            
        })
        .catch(error =>{
            return res.status(500).send({
                status: 500,
                message:'Error encontrado',
                
            });
        } );


    },

    logout: function (req, res){
        const token = req.headers['x-curso2024-access-token'];
        Sessions.findOneAndDelete({user:req.decoded.user.email, key:token})
        .then(session =>{

            if(!session){
                return res.status(200).json({
                    status: 200,
                    message:'Token invalido'
                });
            }

            
            return res.status(200).json({
                status: 200,
                message:'Sesión finalizada'
            });
            
        })
        .catch(error =>{
            console.log(error)
            return res.status(500).send({
                status: 500,
                message:'Token invalido',
                
            });
        } );
    }

}

// Exportar el controller completo

module.exports = controller;
