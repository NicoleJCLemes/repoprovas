import joi from "joi";

const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordConfirmed: joi.ref("password")
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export {signUpSchema, signInSchema}