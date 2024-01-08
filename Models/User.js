import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        maxlength: 35,
        trim: true,
    },
    firstname:{
        type:"string",
        required: true,
        unique: true
    },
    lastname:{
        type:"string",
        required: true,
        unique: true
    },
    password:{
        type:"string",
        required: true,
    },
    refPerson:{
        type:"string",
        // required: true,
        unique: true
    },
    role:{
        type:"string",
        // required: true,
        unique: true
    }
},  { timestamps: true }
)


const genAuthToken = (id)=>{
    return jwt.sign({id},process.env.SECRETKEY)
}
 const userModel = mongoose.model('users',userSchema);
 export{userModel,genAuthToken}