const Joi = require('joi')

module.exports = {
    register (req,res, next) {
        const schema = Joi.object( {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{6,32}$')
            )
        }); 

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        };

        const {error, value} = schema.validate(req.body, options); 
        if (error) {
            switch(error.details[0].context.key) {                    
                case 'email': 
                    res.status(400).send({
                        error: 'You must provide valid email address'
                    })
                    break
                case 'password': 
                    res.status(400).send({
                        error: 'The password must contain the following rules: 1. minimum 6 characters and less than 32 characters'
                                               
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'invalid registration information'
                    })
            }                            
        } else {
            req.body = value;
            next()
        }
    }
}

