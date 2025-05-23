const router = require('express').Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');


const sendEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.GMAILADDR, pass: process.env.GMAILPASS },
    });
  
    const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
    await transporter.sendMail({
      from: "your_email@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Click the link to verify your email: ${verificationLink}`,
    });
};


router.post("/", async(req,res)=>{
    try {
        
        const {error} = validate(req.body);
        if (error){
            return res.status(400).send({message: error.details[0].message});
        }
        
        const user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(409).send({message: 'User with given email already exists!'});
        }
        
        // verify email address
        // gen email token
        // send email with token


        // encrypt password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //add user to db
        await new User({...req.body, password: hashPassword }).save();
        res.status(201).send({message:"User created successfully"})

    }catch(error){
        console.log(error)
        res.status(500).send({message:"Internal Server Error"})
    }
})

module.exports = router;