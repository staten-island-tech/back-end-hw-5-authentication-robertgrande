const router = require('express').Router();
const User = require('../model/user');

//VALIDATION
const joi = require('@hapi/joi');

const schema = {
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required()
};

router.post('/register', async (req, res) => {

    //validate the data before we make a user
    const {error} = joi.validate(req.body, schema);
    if(error) return res.status(400).send(error.details[0].message);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const saveUser = await user.save();
        res.send(saveUser);

    }catch(e){
        res.status(400).send(e);
    }
});

module.exports = router;
