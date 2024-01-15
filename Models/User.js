import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    mail:{
        type: "string",
        required: true,
        unique: true,
        lowercase: true
    },
    firstname:{
        type:"string",
        required: true,
    },
    lastname:{
        type:"string",
        required: true,
    },
    password:{
        type:"string",
        required: true,
    },
        refPerson:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'users',

        },
    role:{
        type:"string",
        // required: true,
    }
},  { timestamps: true }
)


const genAuthToken = (id)=>{
    return jwt.sign({id},process.env.SECRETKEY)
}
 const userModel = mongoose.model('users',userSchema);
 export{userModel,genAuthToken}