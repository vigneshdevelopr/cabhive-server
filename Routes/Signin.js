import express from 'express'
import { userModel } from '../Models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.get('/',async(req,res)=>{
    try {
      let user =  await userModel.find()
      return res.status(200).json(user) 
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Internal Server Error')
    }
})


router.post('/auth',async(req,res)=>{
    const{email,password}=req.body

    try {
let user = await userModel.findOne({email})
if (!user){
    return res.status(404).json('User not found')
}
const validate = await bcrypt.compare(password, user.password)
console.log(validate);
if(!validate){
    return res.status(401).json({message: 'Invalid Credentials'})
}
const genToken = jwt.sign({
    email: user.email,
    role : user.role,

},process.env.SECRETKEY,{
    expiresIn: '3 days'
})
let result = {
    email:user.email,
    role: user.role,
    token: `Bearer ${genToken}`,
    expiresIn: 168
}
console.log(result);
return res.status(200).json({
    ...result,
    message: "You are now logged in.",
  });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: 'Internal Server Error'})
    }
})



export const AuthUser = router;