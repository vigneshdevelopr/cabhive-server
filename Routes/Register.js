import express from "express";
import { genAuthToken, userModel } from "../Models/User.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.get('/',async(req,res)=>{
    try {
        let userList = await userModel.find()
        return res.status(200).json(userList)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send('Internal Server Error')
    }
})

router.post("/register", async(req, res) => {

  try {
    var userList = await userModel.findOne({mail:req.body.mail })

    if (userList)
      return res.status(409).send("User already Exists");
    
    //generate password:
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let refPerson_id = req.body.refPerson;

    // Check if refPerson_id is provided
    if (!refPerson_id) {
      return res.status(400).send('refPerson is required');
    }
    
    // Check if the user with refPerson_id exists
    const refPerson = await userModel.findOne({ mail: refPerson_id });
    
    if (!refPerson) {
      console.log("refPerson not found");
      return res.status(404).send('refPerson not found');
    }
    userList = await new userModel({
      mail: req.body.mail,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashPassword,
      role:req.body.role,
      refPerson: refPerson._id
    }).save();

    const token = genAuthToken(userList._id);
    console.log(userList, token);

    return res
      .status(200)
      .json({ message: `Welcome ${userList.firstname}${userList.lastname}` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error");
  }
});
export const RegisterRouter = router;
