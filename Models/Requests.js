import express from 'express'
import mongoose from 'mongoose'


const requestSchema = new mongoose.Schema({
username: {
    type:mongoose.SchemaTypes.ObjectId,
    ref: 'users'
},
from:{
    type:String,
    required: true,
    minLength: 4,
    maxLength: 255
},
to:{
    type:String,
    required: true,
    minLength: 4,
    maxLength: 255
},
mode_of_payment:{
    type:String,
    required: true,
    minLength: 4,
    maxLength: 255
}
},{
    timestamps: true
})