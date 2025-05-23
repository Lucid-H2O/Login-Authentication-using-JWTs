const router = require('express').Router();
const {User} = require('../models/user');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.post("/", async(req,res)=>{
    try {

        const {error} = validate(req.body);
        if (error)
            return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(401).send({message: 'Invalid Email or Password!'});
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )

        if(!validPassword){
            return res.status(401).send({message: 'Invalid Email or Password!'});
        }

        //gen auth token and send to user
        const accessToken = user.generateAuthToken();

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: 3600 * 1000, // 1 hour
            path: '/',
          });
    
        res.status(200).send({ message: 'Logged in successfully!' });

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Internal Server Error!'});
    }

})

router.get("/", (req,res)=>{
    try {
        const token = req.cookies.access_token;
        if(token){
            jwt.verify(token, process.env.PRIVATEACCESSKEY, {}, (err, user) => {
                if (err) throw err;
                res.json(user);
            })
        }
        else{
            res.json(null);
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Internal Server Error!'});
    }

})

router.post("/logout", async(req,res)=>{
    try {
        res.cookie("access_token", "", {
            httpOnly: true,
            expires: new Date(0), // Set expiration to a past date
            path: "/", // Ensure the path matches the original cookie
          });
        
          // Send a response indicating successful logout
          res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        return res.status(500).send({message: 'Internal Server Error!'});
    }

})

const validate = (data) =>{
    const schema = joi.object({
        email: joi.string().required().label('Email'),
        password: joi.string().required().label("Password"),
    });
    return schema.validate(data)
};

module.exports = router;